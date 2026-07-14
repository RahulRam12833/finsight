using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinSight.api.DTOs.Stock
{
    public class AlphaVantageStock
    {
        public string Symbol { get; set; } = string.Empty;
        public string AssetType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public string CIK { get; set; } = string.Empty;
        public string Exchange { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Sector { get; set; } = string.Empty;
        public string Industry { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string OfficialSite { get; set; } = string.Empty;

        public string FiscalYearEnd { get; set; } = string.Empty;
        public DateTime LatestQuarter { get; set; }

        public decimal? MarketCapitalization { get; set; }
        public decimal? EBITDA { get; set; }

        public decimal? PERatio { get; set; }
        public decimal? PEGRatio { get; set; }

        public decimal? BookValue { get; set; }
        public decimal? DividendPerShare { get; set; }
        public decimal? DividendYield { get; set; }

        public decimal? EPS { get; set; }
        public decimal? RevenuePerShareTTM { get; set; }
        public decimal? ProfitMargin { get; set; }
        public decimal? OperatingMarginTTM { get; set; }
        public decimal? ReturnOnAssetsTTM { get; set; }
        public decimal? ReturnOnEquityTTM { get; set; }

        public decimal? RevenueTTM { get; set; }
        public decimal? GrossProfitTTM { get; set; }

        public decimal? DilutedEPSTTM { get; set; }

        public decimal? QuarterlyEarningsGrowthYOY { get; set; }
        public decimal? QuarterlyRevenueGrowthYOY { get; set; }

        public decimal? AnalystTargetPrice { get; set; }

        public int? AnalystRatingStrongBuy { get; set; }
        public int? AnalystRatingBuy { get; set; }
        public int? AnalystRatingHold { get; set; }
        public int? AnalystRatingSell { get; set; }
        public int? AnalystRatingStrongSell { get; set; }

        public decimal? TrailingPE { get; set; }
        public decimal? ForwardPE { get; set; }
        public decimal? PriceToSalesRatioTTM { get; set; }
        public decimal? PriceToBookRatio { get; set; }
        public decimal? EVToRevenue { get; set; }
        public decimal? EVToEBITDA { get; set; }

        public decimal? Beta { get; set; }

        public decimal? Week52High { get; set; }
        public decimal? Week52Low { get; set; }
        public decimal? Day50MovingAverage { get; set; }
        public decimal? Day200MovingAverage { get; set; }

        public long? SharesOutstanding { get; set; }
        public long? SharesFloat { get; set; }

        public decimal? PercentInsiders { get; set; }
        public decimal? PercentInstitutions { get; set; }

        public DateTime? DividendDate { get; set; }
        public DateTime? ExDividendDate { get; set; }
    }
}