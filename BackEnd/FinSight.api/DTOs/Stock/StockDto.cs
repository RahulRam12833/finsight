using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.DTOs.Comment;

namespace FinSight.api.DTOs.Stock
{
    public class StockDto
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Industry { get; set; } = string.Empty;
        public long MarketCapitalization { get; set; }
        public decimal DividendYield { get; set; }

        public List<CommentDto> Comments { get; set; }
    }
}