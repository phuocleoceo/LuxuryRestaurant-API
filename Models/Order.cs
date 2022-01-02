using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LuxuryRestaurantAPI.Models;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string UserId { get; set; }

    public double OrderTotal { get; set; }

    public DateTime OrderDate { get; set; }

    public List<Food> Foods { get; set; }

    // Change infor when CheckOut
    public string Name { get; set; }

    public string PhoneNumber { get; set; }

    public string Address { get; set; }
}
