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
        public IActionResult GetAll()
        {
            var stocks = _context.PlaceholderStocks.ToList();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var stock = _context.PlaceholderStocks.Find(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock);
        }

        [HttpPost]
        public IActionResult Create([FromBody] PlaceholderStock stock)
        {
            if (stock == null)
            {
                return BadRequest("Invalid stock data.");
            }

            _context.PlaceholderStocks.Add(stock);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = stock.Id }, stock);
        }

    }
}