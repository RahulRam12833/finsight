using FinSight.api.Controllers;
using FinSight.api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace FinSight.api.Tests
{
    public class CommentControllerTests
    {
        [Fact]
        public async Task GetById_ReturnsNotFound_WhenCommentDoesNotExist()
        {
            // Arrange
            var commentRepository = new Mock<ICommentRepository>();

            commentRepository
                .Setup(repo => repo.GetByIdAsync(999))
                .ReturnsAsync((FinSight.api.Models.Comment?)null);

            var controller = new CommentController(
                commentRepository.Object,
                null!,
                null!,
                null!
            );

            // Act
            var result = await controller.GetById(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task GetById_ReturnsOk_WhenCommentExists()
        {
            // Arrange
            var comment = new FinSight.api.Models.Comment
            {
                Id = 1,
                Title = "Test comment",
                Content = "This is a test comment",
                AppUserId = "user-1",
                AppUser = new FinSight.api.Models.AppUser
                {
                    UserName = "testuser"
                }
            };

            var commentRepository = new Mock<ICommentRepository>();

            commentRepository
                .Setup(repo => repo.GetByIdAsync(1))
                .ReturnsAsync(comment);

            var controller = new CommentController(
                commentRepository.Object,
                null!,
                null!,
                null!
            );

            // Act
            var result = await controller.GetById(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedComment = Assert.IsType<FinSight.api.DTOs.Comment.CommentDto>(okResult.Value);

            Assert.Equal(1, returnedComment.Id);
            Assert.Equal("Test comment", returnedComment.Title);
            Assert.Equal("This is a test comment", returnedComment.Content);
            Assert.Equal("testuser", returnedComment.CreatedBy);
        }

        [Fact]
        public async Task GetAll_ReturnsOk_WhenCommentsExist()
        {
            // Arrange
            var comments = new List<FinSight.api.Models.Comment>
       {
        new FinSight.api.Models.Comment
        {
            Id = 1,
            Title = "First comment",
            Content = "First test comment",
            AppUserId = "user-1",
            AppUser = new FinSight.api.Models.AppUser
            {
                UserName = "testuser"
            }
        },
        new FinSight.api.Models.Comment
        {
            Id = 2,
            Title = "Second comment",
            Content = "Second test comment",
            AppUserId = "user-2",
            AppUser = new FinSight.api.Models.AppUser
            {
                UserName = "anotheruser"
            }
        }
    };

            var commentRepository = new Mock<ICommentRepository>();

            commentRepository
                .Setup(repo => repo.GetAllAsync(It.IsAny<FinSight.api.Helpers.CommentQueryObject>()))
                .ReturnsAsync(comments);

            var controller = new CommentController(
                commentRepository.Object,
                null!,
                null!,
                null!
            );

            var queryObject = new FinSight.api.Helpers.CommentQueryObject();

            // Act
            var result = await controller.GetAll(queryObject);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedComments = Assert.IsAssignableFrom<IEnumerable<FinSight.api.DTOs.Comment.CommentDto>>(okResult.Value);

            Assert.Equal(2, returnedComments.Count());
            Assert.Contains(returnedComments, c => c.Title == "First comment");
            Assert.Contains(returnedComments, c => c.Title == "Second comment");
        }

    }
}