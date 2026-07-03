using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinSight.api.Data;
using FinSight.api.DTOs.Comment;
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

        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _options.Comments.AddAsync(commentModel);
            await _options.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> Delete(int id)
        {
            var commentModel = await _options.Comments.FirstOrDefaultAsync(c => c.Id == id);
            if (commentModel == null)
            {
                return null;
            }
            _options.Comments.Remove(commentModel);
            await _options.SaveChangesAsync();
            return commentModel;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await _options.Comments.Include(u => u.AppUser).ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _options.Comments.Include(u => u.AppUser).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment?> UpdateAsync(int id, UpdateCommentRequestDto updateCommentDto)
        {
            var existingComment = await _options.Comments.FirstOrDefaultAsync(c => c.Id == id);

            if (existingComment == null)
            {
                return null;
            }

            existingComment.Title = updateCommentDto.Title;
            existingComment.Content = updateCommentDto.Content;
            await _options.SaveChangesAsync();

            return existingComment;
        }
    }
}