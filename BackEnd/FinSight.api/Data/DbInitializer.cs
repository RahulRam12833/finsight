using System.Linq;
using FinSight.api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinSight.api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDBContext context)
        {
            // Apply migrations
            context.Database.Migrate();

            // Seed PlaceholderStocks if empty
            if (!context.PlaceholderStocks.Any())
            {
                context.PlaceholderStocks.AddRange(new[]
                {
                    new PlaceholderStock { Symbol = "AAPL", CompanyName = "Apple Inc.", Purchase = 150.00m },
                    new PlaceholderStock { Symbol = "MSFT", CompanyName = "Microsoft Corp.", Purchase = 200.50m },
                    // Add more seed data here
                });

                context.SaveChanges();
            }

            // Repeat for other tables if needed
        }
    }
}