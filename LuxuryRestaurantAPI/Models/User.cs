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

    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public string Address { get; set; }

    public string RefreshToken { get; set; }

    public DateTime RefreshTokenExpiryTime { get; set; }

    public string Role { get; set; }
}
