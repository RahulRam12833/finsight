using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.DTOs.Stock;
using FinSight.api.Interfaces;
using FinSight.api.Mappers;
using FinSight.api.Models;
using Newtonsoft.Json;

namespace FinSight.api.Service
{
    public class AlphaVantageService : IAlphaVantageService
    {
        private HttpClient _httpClient;
        private IConfiguration _config;
        public AlphaVantageService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        public async Task<Stock> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={_config["AlphaVantage:APIKey"]}");
                if (!result.IsSuccessStatusCode)
                    return null;

                var content = await result.Content.ReadAsStringAsync();
                var stock = JsonConvert.DeserializeObject<AlphaVantageStock>(content);

                if (stock == null || string.IsNullOrEmpty(stock.Symbol))
                    return null;

                return stock.ToStockFromAlphaVantage();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
    }
}