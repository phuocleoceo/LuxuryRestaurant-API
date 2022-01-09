namespace LuxuryRestaurantAPI.Models;

public class OrderDetail
{
    public string FoodId { get; set; }

    public string FoodName { get; set; }

    public double Price { get; set; }

    public int Quantity { get; set; }
}
