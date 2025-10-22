using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.Data;
using FinSight.api.Interfaces;
using FinSight.api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinSight.api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _options;
        public CommentRepository(ApplicationDBContext options)
        {
            _options = options;
        }
        public async Task<List<Comment>> GetAllAsync()
        {
            return await _options.Comments.ToListAsync();
        }
    }
}