using LuxuryRestaurantAPI.Extension.Paging;
using LuxuryRestaurantAPI.DTO.RequestModel;
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

    public async Task<PagedList<Order>> GetAllAsync(OrderParameter orderParameter)
    {
        List<Order> listOrder = await _orderCollection.Find(_ => true)
                    .SortByDescending(c => c.OrderDate).ToListAsync();
        return listOrder.ToPagedList(orderParameter.PageNumber, orderParameter.PageSize);
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
