using LuxuryRestaurantAPI.Models;
using LuxuryRestaurantAPI.DTO;
using AutoMapper;

namespace LuxuryRestaurantAPI.Mapper;

public class LRMapping : Profile
{
    public LRMapping()
    {
        CreateMap<FoodDTO, Food>();

        CreateMap<UserForLogin, User>();

        CreateMap<UserForRegister, User>()
            .ForMember(u => u.Role, prop => prop.MapFrom(c => "customer"))
            .ForMember(u => u.RefreshToken, prop => prop.MapFrom(c => ""));
    }
}
