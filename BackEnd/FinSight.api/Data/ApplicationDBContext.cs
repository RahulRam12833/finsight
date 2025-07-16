using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using FinSight.api.Models;

namespace FinSight.api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            : base(options)
        {
        }

        // Define DbSets for your entities here
        public DbSet<PlaceholderStock> PlaceholderStocks { get; set; }

    }
}