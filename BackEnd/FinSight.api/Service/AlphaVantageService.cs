using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.Converters;
using FinSight.api.DTOs.Stock;
using FinSight.api.Interfaces;
using FinSight.api.Mappers;
using FinSight.api.Models;
using Newtonsoft.Json;
using FinSight.api.Exceptions;
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
                var content = await result.Content.ReadAsStringAsync();

                Console.WriteLine("AlphaVantage response:");
                Console.WriteLine(content);

                if (!result.IsSuccessStatusCode)
                    return null;

                //var content = await result.Content.ReadAsStringAsync();
                //var stock = JsonConvert.DeserializeObject<AlphaVantageStock>(content);

                if (content.Contains("\"Information\"") || content.Contains("\"Note\""))
                {
                    throw new AlphaVantageRateLimitException();
                }

                var settings = new JsonSerializerSettings
                {
                    Converters = { new NullableDecimalConverter(),
                    new NullableDateTimeConverter() }
                };

                var stock = JsonConvert.DeserializeObject<AlphaVantageStock>(
                    content,
                    settings
                );

                Console.WriteLine($"Deserialized Symbol: {stock?.Symbol}");

                if (stock == null || string.IsNullOrEmpty(stock.Symbol))
                    return null;

                return stock.ToStockFromAlphaVantage();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"AlphaVantage error: {ex}");
                throw;
            }
        }
    }
}