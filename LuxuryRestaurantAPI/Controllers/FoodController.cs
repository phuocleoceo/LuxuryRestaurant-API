using LuxuryRestaurantAPI.DTO.RequestModel;
using LuxuryRestaurantAPI.Extension.Paging;
using Microsoft.AspNetCore.Authorization;
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
public class FoodController : ControllerBase
{
    private readonly FoodService _foodService;
    private readonly IMapper _mapper;
    public FoodController(FoodService foodService, IMapper mapper)
    {
        _foodService = foodService;
        _mapper = mapper;
    }

    [HttpGet("/api/Food/GetFull")]
    [AllowAnonymous]
    public async Task<List<Food>> GetFull()
    {
        return await _foodService.GetAllAsync();
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll([FromQuery] FoodParameter foodParameter = null)
    {
        PagedList<Food> listFood = await _foodService.GetWithParametersAsync(foodParameter);
        return Ok(new
        {
            data = listFood,
            pagination = listFood.MetaData
        });
    }

    [HttpGet("/api/Food/GetList")]
    [AllowAnonymous]
    public async Task<List<Food>> GetList(string listId)
    {
        string[] foodId = listId.Split(",");
        return await _foodService.GetListAsync(foodId);
    }

    [HttpGet("{id:length(24)}")]
    [AllowAnonymous]
    public async Task<ActionResult<Food>> GetOne(string id)
    {
        Food food = await _foodService.GetAsync(id);

        if (food is null)
        {
            return NotFound();
        }
        return food;
    }

    [HttpPost]
    public async Task<IActionResult> Create(FoodDTO newFoodDTO)
    {
        Food newFood = _mapper.Map<Food>(newFoodDTO);
        await _foodService.CreateAsync(newFood);

        return CreatedAtAction(nameof(GetOne), new { id = newFood.Id }, newFood);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, FoodDTO updatedFoodDTO)
    {
        Food food = await _foodService.GetAsync(id);
        if (food is null)
        {
            return NotFound();
        }

        Food updatedFood = _mapper.Map<Food>(updatedFoodDTO);
        updatedFood.Id = food.Id;

        await _foodService.UpdateAsync(id, updatedFood);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        Food food = await _foodService.GetAsync(id);
        if (food is null)
        {
            return NotFound();
        }

        await _foodService.RemoveAsync(id);
        return NoContent();
    }
}
