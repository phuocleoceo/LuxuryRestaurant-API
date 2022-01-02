using LuxuryRestaurantAPI.Extension;
using LuxuryRestaurantAPI.Models;
using MongoDB.Driver;

namespace LuxuryRestaurantAPI.Service;

public class UserService
{
    private readonly IMongoCollection<User> _userCollection;
    public UserService(IConfiguration configuration)
    {
        string CNS = configuration.GetConnectionString("DefaultConnection");

        MongoClient mongoClient = new MongoClient(CNS);

        IMongoDatabase mongoDatabase = mongoClient.GetDatabase("luxury-restaurant");

        _userCollection = mongoDatabase.GetCollection<User>("users");
    }

    public async Task<User> LoginAsync(User userLogin)
    {
        string un = userLogin.Username;
        string pw = userLogin.Password.GetMD5();

        User user = await _userCollection.Find(c => c.Username == un && c.Password == pw)
                    .FirstOrDefaultAsync();

        if (user is null) return null;
        user.Password = "";
        return user;
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _userCollection.Find(_ => true).ToListAsync();
    }

    public async Task<User> GetAsync(string id)
    {
        return await _userCollection.Find(c => c.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(User newUser)
    {
        await _userCollection.InsertOneAsync(newUser);
    }

    public async Task UpdateAsync(string id, User updateUser)
    {
        await _userCollection.ReplaceOneAsync(c => c.Id == id, updateUser);
    }

    public async Task RemoveAsync(string id)
    {
        await _userCollection.DeleteOneAsync(c => c.Id == id);
    }
}
