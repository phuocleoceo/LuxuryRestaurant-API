using LuxuryRestaurantAPI.Extension.Paging;
using LuxuryRestaurantAPI.DTO.RequestModel;
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

    public async Task<PagedList<Food>> GetWithParametersAsync(FoodParameter foodParameter)
    {
        List<Food> listFood = await _foodCollection.Find(_ => true).ToListAsync();
        return listFood.ToPagedList(foodParameter.PageNumber, foodParameter.PageSize);
    }

    public async Task<List<Food>> GetListAsync(string[] foodId)
    {
        return await _foodCollection.Find(c => foodId.Contains(c.Id)).ToListAsync();
    }

    public async Task<Food> GetAsync(string id)
    {
        return await _foodCollection.Find(c => c.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(Food newFood)
    {
        await _foodCollection.InsertOneAsync(newFood);
    }

    public async Task UpdateAsync(string id, Food updateFood)
    {
        await _foodCollection.ReplaceOneAsync(c => c.Id == id, updateFood);
    }

    public async Task RemoveAsync(string id)
    {
        await _foodCollection.DeleteOneAsync(c => c.Id == id);
    }
}
