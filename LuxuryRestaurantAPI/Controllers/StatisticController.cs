using Microsoft.AspNetCore.Authorization;
using LuxuryRestaurantAPI.Extension;
using LuxuryRestaurantAPI.Service;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace LuxuryRestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = Constant.Role_Admin)]
public class StatisticController : ControllerBase
{
    private readonly StatisticService _statisticService;
    private readonly IMapper _mapper;
    public StatisticController(StatisticService statisticService, IMapper mapper)
    {
        _statisticService = statisticService;
        _mapper = mapper;
    }

    [HttpGet("/api/Statistic/SalesPerDOW")]
    public async Task<IActionResult> GetSalesPerDayOfWeek()
    {
        Dictionary<DayOfWeek, double> sales = await _statisticService.GetSalesPerDayOfWeek();
        return Ok(sales);
    }
}
