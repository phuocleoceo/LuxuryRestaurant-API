using LuxuryRestaurantAPI.Service;
using LuxuryRestaurantAPI.Models;
using Microsoft.AspNetCore.Mvc;
using LuxuryRestaurantAPI.DTO;
using System.Net;

namespace LuxuryRestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly OrderService _orderService;
    public OrderController(OrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Order newOrder)
    {
        await _orderService.CreateAsync(newOrder);
        return StatusCode(((int)HttpStatusCode.Created)); //201
    }
}
