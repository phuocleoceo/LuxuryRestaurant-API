using System.ComponentModel.DataAnnotations;

namespace LuxuryRestaurantAPI.DTO;

public class TokenDTO
{
    [Required]
    public string AccessToken { get; set; }

    [Required]
    public string RefreshToken { get; set; }
}
