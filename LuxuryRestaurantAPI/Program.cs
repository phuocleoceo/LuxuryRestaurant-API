using LuxuryRestaurantAPI.Authentication;
using LuxuryRestaurantAPI.Extension;
using LuxuryRestaurantAPI.Service;
using LuxuryRestaurantAPI.Mapper;
using LuxuryRestaurantAPI.Email;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Cors
builder.Services.AddCors(c =>
    c.AddDefaultPolicy(options =>
    {
        options.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    })
);

builder.Services.AddSingleton<FoodService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<OrderService>();
builder.Services.AddAutoMapper(typeof(LRMapping));
builder.Services.AddScoped<IAuthenticationManager, AuthenticationManager>();

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddTransient<IMailService, MailService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// JWT
builder.Services.AddAuthentication();
builder.Services.ConfigureJWT(builder.Configuration);
// Swagger
builder.Services.ConfigureSwaggerWithAuth();

var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "back_end");
        c.RoutePrefix = "";
    });
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
