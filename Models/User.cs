using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LuxuryRestaurantAPI.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string Displayname { get; set; }

    public string Role { get; set; }
}
