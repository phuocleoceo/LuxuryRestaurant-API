using System.Security.Claims;
using LuxuryRestaurantAPI.Models;

namespace LuxuryRestaurantAPI.Authentication;

public interface IAuthenticationManager
{
    IEnumerable<Claim> GetClaims(User _user);

    string CreateAccessToken(IEnumerable<Claim> claims);
}
