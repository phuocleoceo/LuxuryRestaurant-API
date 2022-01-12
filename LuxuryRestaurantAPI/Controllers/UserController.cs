using Microsoft.AspNetCore.Authorization;
using LuxuryRestaurantAPI.Authentication;
using LuxuryRestaurantAPI.Extension;
using LuxuryRestaurantAPI.Service;
using LuxuryRestaurantAPI.Models;
using Microsoft.AspNetCore.Mvc;
using LuxuryRestaurantAPI.DTO;
using AutoMapper;

namespace LuxuryRestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = Constant.Role_Admin)]
public class UserController : ControllerBase
{
    private readonly UserService _userService;
    private readonly IMapper _mapper;
    public UserController(UserService userService, IMapper mapper,
                            IAuthenticationManager authManager)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetListUser()
    {
        List<User> listUser = await _userService.GetAllAsync();
        IEnumerable<UserDTO> list = listUser.Select(c => _mapper.Map<UserDTO>(c));
        return Ok(list);
    }

    [HttpGet("{id:length(24)}")]
    [AllowAnonymous]
    public async Task<ActionResult<User>> GetUserInfor(string id)
    {
        User user = await _userService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }
        return user;
    }

    [HttpPut("{id:length(24)}")]
    [AllowAnonymous]
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
