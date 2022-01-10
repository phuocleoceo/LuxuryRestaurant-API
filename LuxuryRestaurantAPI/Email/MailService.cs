using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace LuxuryRestaurantAPI.Email;

public class MailService : IMailService
{
    private readonly MailSettings _mailSettings;
    private readonly ILogger<MailService> _logger;
    public MailService(IOptions<MailSettings> mailSettings, ILogger<MailService> logger)
    {
        _mailSettings = mailSettings.Value;
        _logger = logger;
        logger.LogInformation("Create MailService");
    }

    public async Task SendEmailAsync(MailContent mailContent)
    {
        MimeMessage email = new MimeMessage();
        email.Sender = new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail);
        email.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail));
        email.To.Add(MailboxAddress.Parse(mailContent.ToEmail));
        email.Subject = mailContent.Subject;

        BodyBuilder builder = new BodyBuilder();
        if (mailContent.Attachments != null)
        {
            byte[] fileBytes;
            foreach (IFormFile file in mailContent.Attachments)
            {
                if (file.Length > 0)
                {
                    using (MemoryStream ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        fileBytes = ms.ToArray();
                    }
                    builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                }
            }
        }
        builder.HtmlBody = mailContent.Body;
        email.Body = builder.ToMessageBody();

        using var smtp = new SmtpClient();

        try
        {
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            _logger.LogInformation("Send mail to " + mailContent.ToEmail);
        }
        catch (Exception ex)
        {
            _logger.LogError("Error when sending email to " + mailContent.ToEmail);
            _logger.LogError(ex.Message);
        }

        smtp.Disconnect(true);
    }
}
