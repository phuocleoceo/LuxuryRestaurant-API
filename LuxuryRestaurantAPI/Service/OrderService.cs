using LuxuryRestaurantAPI.Models;
using MongoDB.Driver;

namespace LuxuryRestaurantAPI.Service;

public class OrderService
{
    private readonly IMongoCollection<Order> _orderCollection;
    public OrderService(IConfiguration configuration)
    {
        string CNS = configuration.GetConnectionString("DefaultConnection");

        MongoClient mongoClient = new MongoClient(CNS);

        IMongoDatabase mongoDatabase = mongoClient.GetDatabase("luxury-restaurant");

        _orderCollection = mongoDatabase.GetCollection<Order>("orders");
    }

    public async Task<Order> GetAsync(string UserId)
    {
        return await _orderCollection.Find(c => c.UserId == UserId).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(Order newOrder)
    {
        await _orderCollection.InsertOneAsync(newOrder);
    }
}
