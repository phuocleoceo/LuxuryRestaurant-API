using LuxuryRestaurantAPI.Service;
using LuxuryRestaurantAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LuxuryRestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodController : ControllerBase
{
    private readonly FoodService _foodService;
    public FoodController(FoodService foodService)
    {
        _foodService = foodService;
    }

    [HttpGet]
    public async Task<List<Food>> GetAll()
    {
        return await _foodService.GetAllAsync();
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Food>> GetOne(string id)
    {
        Food? food = await _foodService.GetAsync(id);

        if (food is null)
        {
            return NotFound();
        }
        return food;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Food newFood)
    {
        await _foodService.CreateAsync(newFood);

        return CreatedAtAction(nameof(GetOne), new { id = newFood.Id }, newFood);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Food updatedFood)
    {
        Food? food = await _foodService.GetAsync(id);
        if (food is null)
        {
            return NotFound();
        }

        updatedFood.Id = food.Id;

        await _foodService.UpdateAsync(id, updatedFood);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        Food? food = await _foodService.GetAsync(id);
        if (food is null)
        {
            return NotFound();
        }

        await _foodService.RemoveAsync(id);
        return NoContent();
    }
}
