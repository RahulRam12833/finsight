using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.Data;
using FinSight.api.Interfaces;
using FinSight.api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinSight.api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios.Where(u => u.AppUserId == user.Id)
            .Select(stock => new Stock
            {
                Id = stock.StockId,
                Symbol = stock.Stock.Symbol,
                Name = stock.Stock.Name,
                Industry = stock.Stock.Industry,
                MarketCapitalization = stock.Stock.MarketCapitalization,
                DividendYield = stock.Stock.DividendYield
            }).ToListAsync();
        }
    }
}