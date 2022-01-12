using Microsoft.AspNetCore.Authorization;
using LuxuryRestaurantAPI.Authentication;
using LuxuryRestaurantAPI.Service;
using LuxuryRestaurantAPI.Models;
using Microsoft.AspNetCore.Mvc;
using LuxuryRestaurantAPI.DTO;
using System.Security.Claims;
using AutoMapper;
using System.Net;

namespace LuxuryRestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationManager _authManager;
    private readonly IConfiguration _configuration;
    private readonly UserService _userService;
    private readonly IMapper _mapper;
    public AuthenticationController(UserService userService, IMapper mapper,
                            IAuthenticationManager authManager, IConfiguration configuration)
    {
        _userService = userService;
        _mapper = mapper;
        _authManager = authManager;
        _configuration = configuration;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register(UserForRegister newUserReg)
    {
        User newUser = _mapper.Map<User>(newUserReg);
        await _userService.CreateAsync(newUser);

        return StatusCode(((int)HttpStatusCode.Created)); //201
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(UserForLogin userForLogin)
    {
        User user = _mapper.Map<User>(userForLogin);
        User _user = await _userService.LoginAsync(user);
        if (_user is null)
        {
            return Unauthorized();
        }
        // Create TOKEN
        IEnumerable<Claim> claims = _authManager.GetClaims(_user);
        string accessToken = _authManager.CreateAccessToken(claims);
        string refreshToken = _authManager.CreateRefreshToken();

        _user.RefreshToken = refreshToken;
        string refreshTokenExpiryTime = _configuration.GetSection("JwtSettings:refreshTokenExpires").Value;
        _user.RefreshTokenExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(refreshTokenExpiryTime));
        await _userService.UpdateAsync(_user.Id, _user);

        var userInfor = new
        {
            Id = _user.Id,
            Username = _user.Username,
            Displayname = _user.Displayname,
            Email = _user.Email,
            PhoneNumber = _user.PhoneNumber,
            Address = _user.Address,
            Role = _user.Role
        };
        return Ok(new
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            User = userInfor
        });
    }

    [HttpPost("Refresh")]
    public async Task<IActionResult> Refresh(TokenDTO tokenDTO)
    {
        if (tokenDTO == null)
        {
            return BadRequest("Invalid client request");
        }

        string accessToken = tokenDTO.AccessToken;
        string refreshToken = tokenDTO.RefreshToken;
        ClaimsPrincipal principal = _authManager.GetPrincipalFromExpiredToken(accessToken);
        string username = principal.Identity.Name;

        User _user = await _userService.GetByUserNameAsync(username);
        if (_user == null || _user.RefreshToken != refreshToken ||
            _user.RefreshTokenExpiryTime <= DateTime.Now)
        {
            return BadRequest("Invalid client request or refresh token expired");
        }

        string newAccessToken = _authManager.CreateAccessToken(principal.Claims);
        string newRefreshToken = _authManager.CreateRefreshToken();
        _user.RefreshToken = newRefreshToken; // Not change ExpireDay, it's only changed when Re-Login or Revoke
        await _userService.UpdateAsync(_user.Id, _user);

        var userInfor = new
        {
            Id = _user.Id,
            Username = _user.Username,
            Displayname = _user.Displayname,
            Email = _user.Email,
            PhoneNumber = _user.PhoneNumber,
            Address = _user.Address,
            Role = _user.Role
        };
        return Ok(new
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            User = userInfor
        });
    }

    [HttpPost("Revoke")]
    [Authorize]
    public async Task<IActionResult> Revoke()
    {
        string username = User.Identity.Name;
        User _user = await _userService.GetByUserNameAsync(username);
        if (_user == null)
        {
            return BadRequest("Revoke refresh token fail");
        }

        _user.RefreshToken = null;
        _user.RefreshTokenExpiryTime = new DateTime();
        await _userService.UpdateAsync(_user.Id, _user);
        return NoContent();
    }
}
