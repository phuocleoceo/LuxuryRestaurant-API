using Microsoft.AspNetCore.Authorization;
using LuxuryRestaurantAPI.Service;
using LuxuryRestaurantAPI.Models;
using Microsoft.AspNetCore.Mvc;
using LuxuryRestaurantAPI.DTO;
using System.Net;
using AutoMapper;

namespace LuxuryRestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrderController : ControllerBase
{
    private readonly OrderService _orderService;
    private readonly IMapper _mapper;
    public OrderController(OrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }

    [HttpPost("/api/Order/Checkout")]
    public async Task<IActionResult> Checkout(OrderDTO newOrder)
    {
        Order order = _mapper.Map<Order>(newOrder);
        order.OrderDate = DateTime.Now;
        order.OrderTotal = order.OrderDetails.Sum(c => c.Price * c.Quantity);
        await _orderService.CreateAsync(order);
        return StatusCode(((int)HttpStatusCode.Created)); //201
    }
}
