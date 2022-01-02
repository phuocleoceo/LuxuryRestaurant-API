using LuxuryRestaurantAPI.Models;
using LuxuryRestaurantAPI.DTO;
using AutoMapper;

namespace LuxuryRestaurantAPI.Mapper;

public class LRMapping : Profile
{
    public LRMapping()
    {
        CreateMap<FoodDTO, Food>();
    }
}
