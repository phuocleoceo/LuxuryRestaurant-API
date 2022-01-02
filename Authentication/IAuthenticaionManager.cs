using System.Security.Claims;
using LuxuryRestaurantAPI.Models;

namespace LuxuryRestaurantAPI.Authentication;

public interface IAuthenticaionManager
{
    IEnumerable<Claim> GetClaims(User _user);

    string CreateAccessToken(IEnumerable<Claim> claims);
}
