using LuxuryRestaurantAPI.Models;
using MongoDB.Driver;

namespace LuxuryRestaurantAPI.Service;

public class FoodService
{
    private readonly IMongoCollection<Food> _foodCollection;
    public FoodService(IConfiguration configuration)
    {
        string CNS = configuration.GetConnectionString("DefaultConnection");

        MongoClient mongoClient = new MongoClient(CNS);

        IMongoDatabase mongoDatabase = mongoClient.GetDatabase("luxury-restaurant");

        _foodCollection = mongoDatabase.GetCollection<Food>("foods");
    }

    public async Task<List<Food>> GetAllAsync()
    {
        return await _foodCollection.Find(_ => true).ToListAsync();
    }

    public async Task<Food?> GetAsync(string id)
    {
        return await _foodCollection.Find(c => c.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(Food newFood)
    {
        await _foodCollection.InsertOneAsync(newFood);
    }

    public async Task UpdateAsync(string id, Food updatedFood)
    {
        await _foodCollection.ReplaceOneAsync(c => c.Id == id, updatedFood);
    }

    public async Task RemoveAsync(string id)
    {
        await _foodCollection.DeleteOneAsync(c => c.Id == id);
    }
}
