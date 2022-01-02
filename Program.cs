using LuxuryRestaurantAPI.Service;
using LuxuryRestaurantAPI.Mapper;
using LuxuryRestaurantAPI.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSingleton<FoodService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddAutoMapper(typeof(LRMapping));
builder.Services.AddScoped<IAuthenticationManager, AuthenticationManager>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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

app.UseAuthorization();

app.MapControllers();

app.Run();
