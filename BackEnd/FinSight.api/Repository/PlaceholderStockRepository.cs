using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.Interfaces;
using FinSight.api.Models;
using FinSight.api.Data;
using Microsoft.EntityFrameworkCore;
namespace FinSight.api.Repository
{
    public class PlaceholderStockRepository : IPlaceholderStockRepository
    {
        private readonly ApplicationDBContext _context;

        public PlaceholderStockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<PlaceholderStock> CreateStockAsync(PlaceholderStock stock)
        {
            await _context.PlaceholderStocks.AddAsync(stock);
            await _context.SaveChangesAsync();
            return stock;
        }

        public async Task<List<PlaceholderStock>> GetAllStocksAsync()
        {
            return await _context.PlaceholderStocks.ToListAsync();
        }

        public async Task<PlaceholderStock?> GetStockByIdAsync(int id)
        {
            return await _context.PlaceholderStocks.FindAsync(id);
        }
    }
}