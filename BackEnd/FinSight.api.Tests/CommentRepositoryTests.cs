using FinSight.api.Data;
using FinSight.api.Models;
using FinSight.api.Repository;
using Microsoft.EntityFrameworkCore;
using FinSight.api.DTOs.Comment;
using FinSight.api.Helpers;
namespace FinSight.api.Tests
{
    public class CommentRepositoryTests
    {
        [Fact]
        public async Task GetByIdAsync_ReturnsComment_WhenCommentExists()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var comment = new Comment
            {
                Id = 1,
                Title = "Test comment",
                Content = "This is a test comment",
                AppUserId = "user-1",
                AppUser = new AppUser
                {
                    Id = "user-1",
                    UserName = "testuser"
                }
            };

            context.Comments.Add(comment);
            await context.SaveChangesAsync();

            var repository = new CommentRepository(context);

            // Act
            var result = await repository.GetByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("Test comment", result.Title);
            Assert.Equal("This is a test comment", result.Content);
        }


        [Fact]
        public async Task GetByIdAsync_ReturnsNull_WhenCommentDoesNotExist()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var repository = new CommentRepository(context);

            // Act
            var result = await repository.GetByIdAsync(999);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task CreateAsync_AddsCommentToDatabase()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var repository = new CommentRepository(context);

            var comment = new Comment
            {
                Title = "Test comment",
                Content = "This is a test comment",
                AppUserId = "user-1"
            };

            // Act
            var result = await repository.CreateAsync(comment);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Test comment", result.Title);
            Assert.Equal("This is a test comment", result.Content);

            var savedComment = await context.Comments
                .FirstOrDefaultAsync(c => c.Title == "Test comment");

            Assert.NotNull(savedComment);
            Assert.Equal("This is a test comment", savedComment.Content);
        }

        [Fact]
        public async Task UpdateAsync_ReturnsNull_WhenCommentDoesNotExist()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var repository = new CommentRepository(context);

            var updateDto = new UpdateCommentRequestDto
            {
                Title = "Updated title",
                Content = "Updated content"
            };

            // Act
            var result = await repository.UpdateAsync(999, updateDto);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateAsync_UpdatesComment_WhenCommentExists()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var comment = new Comment
            {
                Id = 1,
                Title = "Original title",
                Content = "Original content",
                AppUserId = "user-1"
            };

            context.Comments.Add(comment);
            await context.SaveChangesAsync();

            var repository = new CommentRepository(context);

            var updateDto = new UpdateCommentRequestDto
            {
                Title = "Updated title",
                Content = "Updated content"
            };

            // Act
            var result = await repository.UpdateAsync(1, updateDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Updated title", result.Title);
            Assert.Equal("Updated content", result.Content);

            var updatedComment = await context.Comments
                .FirstOrDefaultAsync(c => c.Id == 1);

            Assert.NotNull(updatedComment);
            Assert.Equal("Updated title", updatedComment.Title);
            Assert.Equal("Updated content", updatedComment.Content);
        }

        [Fact]
        public async Task Delete_ReturnsNull_WhenCommentDoesNotExist()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var repository = new CommentRepository(context);

            // Act
            var result = await repository.Delete(999);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task Delete_RemovesComment_WhenCommentExists()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var comment = new Comment
            {
                Id = 1,
                Title = "Test comment",
                Content = "This is a test comment",
                AppUserId = "user-1"
            };

            context.Comments.Add(comment);
            await context.SaveChangesAsync();

            var repository = new CommentRepository(context);

            // Act
            var result = await repository.Delete(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);

            var deletedComment = await context.Comments
                .FirstOrDefaultAsync(c => c.Id == 1);

            Assert.Null(deletedComment);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsAllComments()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var user = new AppUser
            {
                Id = "user-1",
                UserName = "testuser"
            };

            var stock = new Stock
            {
                Id = 1,
                Symbol = "AAPL",
                Name = "Apple"
            };

            var comments = new List<Comment>
    {
        new Comment
        {
            Id = 1,
            Title = "First comment",
            Content = "First content",
            AppUserId = user.Id,
            AppUser = user,
            StockId = stock.Id,
            Stock = stock
        },
        new Comment
        {
            Id = 2,
            Title = "Second comment",
            Content = "Second content",
            AppUserId = user.Id,
            AppUser = user,
            StockId = stock.Id,
            Stock = stock
        }
    };

            context.Comments.AddRange(comments);
            await context.SaveChangesAsync();

            var repository = new CommentRepository(context);

            var queryObject = new CommentQueryObject();

            // Act
            var result = await repository.GetAllAsync(queryObject);

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Contains(result, c => c.Title == "First comment");
            Assert.Contains(result, c => c.Title == "Second comment");
        }

        [Fact]
        public async Task GetAllAsync_ReturnsOnlyCommentsForSpecifiedStock()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDBContext(options);

            var user = new AppUser
            {
                Id = "user-1",
                UserName = "testuser"
            };

            var appleStock = new Stock
            {
                Id = 1,
                Symbol = "AAPL",
                Name = "Apple"
            };

            var microsoftStock = new Stock
            {
                Id = 2,
                Symbol = "MSFT",
                Name = "Microsoft"
            };

            var comments = new List<Comment>
            {
                new Comment
                {
                    Id = 1,
                    Title = "Apple comment",
                    Content = "Apple content",
                    StockId = 1,
                    Stock = appleStock,
                    AppUserId = "user-1",
                    AppUser = user
                },
                new Comment
                {
                    Id = 2,
                    Title = "Microsoft comment",
                    Content = "Microsoft content",
                    StockId = 2,
                    Stock = microsoftStock,
                    AppUserId = "user-1",
                    AppUser = user
                }
            };

            context.Users.Add(user);
            context.Stock.AddRange(appleStock, microsoftStock);
            context.Comments.AddRange(comments);

            await context.SaveChangesAsync();

            var repository = new CommentRepository(context);

            var queryObject = new CommentQueryObject
            {
                Symbol = "AAPL"
            };

            // Act
            var result = await repository.GetAllAsync(queryObject);

            // Assert
            Assert.Single(result);
            Assert.Equal("Apple comment", result[0].Title);
            Assert.Equal("AAPL", result[0].Stock!.Symbol);
        }
    }
}