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

    public async Task<List<Order>> GetAllAsync()
    {
        return await _orderCollection.Find(_ => true)
                    .SortByDescending(c => c.OrderDate).ToListAsync();
    }

    public async Task<Order> GetOneAsync(string UserId)
    {
        return await _orderCollection.Find(c => c.UserId == UserId).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(Order newOrder)
    {
        await _orderCollection.InsertOneAsync(newOrder);
    }
}
