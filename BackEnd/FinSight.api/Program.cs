using FinSight.api.Data;
using FinSight.api.Interfaces;
using FinSight.api.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var baseConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var saPassword = Environment.GetEnvironmentVariable("SA_PASSWORD");

var finalConnectionString = $"{baseConnectionString}Password={saPassword};";
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(finalConnectionString));

builder.Services.AddScoped<IPlaceholderStockRepository, PlaceholderStockRepository>();
var app = builder.Build();

// Apply migrations on startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
    dbContext.Database.Migrate();

    DbInitializer.Initialize(dbContext);
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(policy =>
{
    policy.AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials()
          //.WithOrigins("https://localhost:5173")
          .SetIsOriginAllowed(origin => true); // Allows all origins for development purposes

});
app.MapControllers();
app.Run();
