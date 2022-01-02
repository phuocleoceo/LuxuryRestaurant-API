using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using LuxuryRestaurantAPI.Models;
using System.Security.Claims;
using System.Text;

namespace LuxuryRestaurantAPI.Authentication;

public class AuthenticationManager : IAuthenticaionManager
{
    private readonly IConfiguration _configuration;
    public AuthenticationManager(IConfiguration configuration)
    {
        _configuration = configuration;
    }

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
}
