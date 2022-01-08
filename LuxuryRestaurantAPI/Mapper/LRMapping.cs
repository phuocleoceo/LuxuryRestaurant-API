using LuxuryRestaurantAPI.Extension;
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
            .ForMember(u => u.Password, prop => prop.MapFrom(c => c.Password.GetMD5()));

        CreateMap<OrderDTO, Order>();
    }
}
