using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.DTOs.Stock;
using FinSight.api.Models;

namespace FinSight.api.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                Name = stockModel.Name,
                Industry = stockModel.Industry,
                MarketCapitalization = stockModel.MarketCapitalization,
                DividendYield = stockModel.DividendYield
            };
        }
    }
}