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

        public static Stock ToStockFromCreateDTO(this CreateStockRequestDto stockDto)
        {
            return new Stock
            {
                Symbol = stockDto.Symbol,
                Name = stockDto.Name,
                Industry = stockDto.Industry,
                MarketCapitalization = stockDto.MarketCapitalization,
                DividendYield = stockDto.DividendYield
            };
        }
    }
}