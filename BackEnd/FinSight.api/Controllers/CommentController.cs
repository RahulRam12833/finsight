using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.Interfaces;
using FinSight.api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace FinSight.api.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepository.GetAllAsync();
            var commentDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentDto);
        }
    }
}