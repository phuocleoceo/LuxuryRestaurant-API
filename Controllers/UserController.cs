using LuxuryRestaurantAPI.Authentication;
using LuxuryRestaurantAPI.Service;
using LuxuryRestaurantAPI.Models;
using Microsoft.AspNetCore.Mvc;
using LuxuryRestaurantAPI.DTO;
using AutoMapper;
using System.Security.Claims;

namespace LuxuryRestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IAuthenticationManager _authManager;
    private readonly UserService _userService;
    private readonly IMapper _mapper;
    public UserController(UserService userService, IMapper mapper,
                            IAuthenticationManager authManager)
    {
        _userService = userService;
        _mapper = mapper;
        _authManager = authManager;
    }

    [HttpGet]
    public async Task<List<User>> GetListUser()
    {
        return await _userService.GetAllAsync();
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> GetUserInfor(string id)
    {
        User user = await _userService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }
        return user;
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
            User = userInfor
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegister newUserReg)
    {
        User newUser = _mapper.Map<User>(newUserReg);
        await _userService.CreateAsync(newUser);

        return CreatedAtAction(nameof(GetUserInfor), new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> UpdateUserInfor(string id, UserForRegister updateUserReg)
    {
        User user = await _userService.GetAsync(id);
        if (user is null)
        {
            return NotFound();
        }

        User updateUser = _mapper.Map<User>(updateUserReg);
        updateUser.Id = user.Id;

        await _userService.UpdateAsync(id, updateUser);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> RemoveUser(string id)
    {
        User user = await _userService.GetAsync(id);
        if (user is null)
        {
            return NotFound();
        }

        await _userService.RemoveAsync(id);
        return NoContent();
    }
}
