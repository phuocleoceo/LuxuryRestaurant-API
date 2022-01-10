namespace LuxuryRestaurantAPI.Email;

public interface IMailService
{
    Task SendEmailAsync(MailContent mailContent);
}
