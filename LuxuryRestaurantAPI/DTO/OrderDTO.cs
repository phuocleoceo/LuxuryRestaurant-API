using LuxuryRestaurantAPI.Models;

namespace LuxuryRestaurantAPI.DTO;

public class OrderDTO
{
    public string UserId { get; set; }

    public List<OrderDetail> OrderDetails { get; set; }

    // Change infor when CheckOut
    public string Name { get; set; }

    public string PhoneNumber { get; set; }

    public string Address { get; set; }
}
