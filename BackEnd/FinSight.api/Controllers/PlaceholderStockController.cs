using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinSight.api.Models;
using FinSight.api.Data;

namespace FinSight.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaceholderStockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public PlaceholderStockController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stocks = await _context.PlaceholderStocks.ToListAsync();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var stock = await _context.PlaceholderStocks.FindAsync(id);
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

            await _context.PlaceholderStocks.AddAsync(stock);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = stock.Id }, stock);
        }

    }
}