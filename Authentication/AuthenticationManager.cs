using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using LuxuryRestaurantAPI.Models;
using System.Security.Claims;
using System.Text;

namespace LuxuryRestaurantAPI.Authentication;

public class AuthenticationManager : IAuthenticationManager
{
    private readonly IConfiguration _configuration;
    public AuthenticationManager(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // ACCESS TOKEN
    public IEnumerable<Claim> GetClaims(User _user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, _user.Username)
        };
        claims.Add(new Claim(ClaimTypes.Role, _user.Role));
        return claims;
    }

    private SigningCredentials GetSigningCredentials()
    {
        string _configKey = _configuration.GetSection("JwtSettings:secretKey").Value;
        byte[] key = Encoding.UTF8.GetBytes(_configKey);
        SymmetricSecurityKey secret = new SymmetricSecurityKey(key);
        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }

    private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials,
                                                    IEnumerable<Claim> claims)
    {
        IConfigurationSection jwtSettings = _configuration.GetSection("JwtSettings");
        JwtSecurityToken tokenOptions = new JwtSecurityToken
        (
            issuer: jwtSettings.GetSection("validIssuer").Value,
            audience: jwtSettings.GetSection("validAudience").Value,
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
            signingCredentials: signingCredentials
        );
        return tokenOptions;
    }

    public string CreateAccessToken(IEnumerable<Claim> claims)
    {
        SigningCredentials signingCredentials = GetSigningCredentials();
        JwtSecurityToken tokenOptions = GenerateTokenOptions(signingCredentials, claims);
        return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
    }

    // REFRESH TOKEN
    public string CreateRefreshToken()
    {
        byte[] randomNumber = new byte[32];
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }

    public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        string _configKey = _configuration.GetSection("JwtSettings:secretKey").Value;
        byte[] key = Encoding.UTF8.GetBytes(_configKey);
        TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
        };

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken securityToken;
        ClaimsPrincipal principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
        JwtSecurityToken jwtSecurityToken = securityToken as JwtSecurityToken;

        if (jwtSecurityToken == null ||
            !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                                    StringComparison.InvariantCultureIgnoreCase))
            throw new SecurityTokenException("Invalid token");
        return principal;
    }
}
