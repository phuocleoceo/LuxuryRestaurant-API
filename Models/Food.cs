using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LuxuryRestaurantAPI.Models;

public class Food
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string? Name { get; set; }

    public double Price { get; set; }

    public string? Description { get; set; }
}
