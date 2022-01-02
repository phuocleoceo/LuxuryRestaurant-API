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

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegister newUserReg)
    {
        User newUser = _mapper.Map<User>(newUserReg);
        await _userService.CreateAsync(newUser);

        return StatusCode(((int)HttpStatusCode.Created)); //201
    }

    [HttpPost("login")]
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
            Displayname = _user.Displayname,
            Username = _user.Username,
            Role = _user.Role
        };
        return Ok(new
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            User = userInfor
        });
    }
}
