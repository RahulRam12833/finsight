using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.Models;

namespace FinSight.api.Interfaces
{
    public interface IPlaceholderStockRepository
    {
        Task<IEnumerable<PlaceholderStock>> GetAllStocksAsync();
        Task<PlaceholderStock> GetStockByIdAsync(int id);
        Task<PlaceholderStock> CreateStockAsync(PlaceholderStock stock);
    }
}