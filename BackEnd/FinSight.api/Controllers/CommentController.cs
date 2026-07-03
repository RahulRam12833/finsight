using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.Interfaces;
using FinSight.api.Mappers;
using FinSight.api.DTOs.Comment;
using Microsoft.AspNetCore.Mvc;
using FinSight.api.Models;
using Microsoft.AspNetCore.Identity;
using FinSight.api.Extensions;

namespace FinSight.api.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IAlphaVantageService _alphaVantageService;
        public CommentController(ICommentRepository commentRepository, IStockRepository stockRepository, UserManager<AppUser> UserManager, IAlphaVantageService alphaVantageService)
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
            _userManager = UserManager;
            _alphaVantageService = alphaVantageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comments = await _commentRepository.GetAllAsync();
            var commentDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepository.GetByIdAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{symbol:alpha}")]
        public async Task<IActionResult> Create([FromRoute] string symbol, CreateCommentDto commentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stock = await _stockRepository.GetBySymbolAsync(symbol);

            if (stock == null)
            {
                stock = await _alphaVantageService.FindStockBySymbolAsync(symbol);
                if (stock == null)
                    return BadRequest("Stock does not exists");
                else
                    await _stockRepository.CreateAsync(stock);
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var commentModel = commentDto.ToCommentFromCreateDto(stock.Id);
            commentModel.AppUserId = appUser.Id;
            await _commentRepository.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepository.Delete(id);
            if (commentModel == null)
            {
                return NotFound("Comment does not exist");
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepository.UpdateAsync(id, updateDto);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

    }
}