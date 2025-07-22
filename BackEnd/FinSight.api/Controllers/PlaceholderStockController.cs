using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinSight.api.Models;
using FinSight.api.Data;
using FinSight.api.Interfaces;

namespace FinSight.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaceholderStockController : ControllerBase
    {
        private readonly IPlaceholderStockRepository _placeholderStockRepository;

        public PlaceholderStockController(IPlaceholderStockRepository placeholderStockRepository)
        {
            _placeholderStockRepository = placeholderStockRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stocks = await _placeholderStockRepository.GetAllStocksAsync();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var stock = await _placeholderStockRepository.GetStockByIdAsync(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PlaceholderStock stock)
        {
            if (stock == null)
            {
                return BadRequest("Invalid stock data.");
            }

            await _placeholderStockRepository.CreateStockAsync(stock);
            return CreatedAtAction(nameof(GetById), new { id = stock.Id }, stock);
        }

    }
}