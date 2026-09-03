using FinSight.api.Controllers;
using FinSight.api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using FinSight.api.Models;
using FinSight.api.DTOs.Comment;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
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

        [Fact]
        public async Task Update_ReturnsNotFound_WhenCommentDoesNotExist()
        {
            // Arrange
            var updateDto = new FinSight.api.DTOs.Comment.UpdateCommentRequestDto
            {
                Title = "Updated title",
                Content = "Updated content"
            };

            var commentRepository = new Mock<ICommentRepository>();

            commentRepository
                .Setup(repo => repo.UpdateAsync(999, updateDto))
                .ReturnsAsync((FinSight.api.Models.Comment?)null);

            var controller = new CommentController(
                commentRepository.Object,
                null!,
                null!,
                null!
            );

            // Act
            var result = await controller.Update(999, updateDto);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsOk_WhenCommentExists()
        {
            // Arrange
            var updateDto = new FinSight.api.DTOs.Comment.UpdateCommentRequestDto
            {
                Title = "Updated title",
                Content = "Updated content"
            };

            var updatedComment = new FinSight.api.Models.Comment
            {
                Id = 1,
                Title = "Updated title",
                Content = "Updated content",
                AppUserId = "user-1",
                AppUser = new FinSight.api.Models.AppUser
                {
                    UserName = "testuser"
                }
            };

            var commentRepository = new Mock<ICommentRepository>();

            commentRepository
                .Setup(repo => repo.UpdateAsync(1, updateDto))
                .ReturnsAsync(updatedComment);

            var controller = new CommentController(
                commentRepository.Object,
                null!,
                null!,
                null!
            );

            // Act
            var result = await controller.Update(1, updateDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedComment =
                Assert.IsType<FinSight.api.DTOs.Comment.CommentDto>(okResult.Value);

            Assert.Equal(1, returnedComment.Id);
            Assert.Equal("Updated title", returnedComment.Title);
            Assert.Equal("Updated content", returnedComment.Content);
            Assert.Equal("testuser", returnedComment.CreatedBy);
        }

        [Fact]
        public async Task Delete_ReturnsNotFound_WhenCommentDoesNotExist()
        {
            // Arrange
            var commentRepository = new Mock<ICommentRepository>();

            commentRepository
                .Setup(repo => repo.Delete(999))
                .ReturnsAsync((FinSight.api.Models.Comment?)null);

            var controller = new CommentController(
                commentRepository.Object,
                null!,
                null!,
                null!
            );

            // Act
            var result = await controller.Delete(999);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);

            Assert.Equal("Comment does not exist", notFoundResult.Value);
        }

        [Fact]
        public async Task Delete_ReturnsNoContent_WhenCommentExists()
        {
            // Arrange
            var comment = new FinSight.api.Models.Comment
            {
                Id = 1,
                Title = "Test comment",
                Content = "Test content"
            };

            var commentRepository = new Mock<ICommentRepository>();

            commentRepository
                .Setup(repo => repo.Delete(1))
                .ReturnsAsync(comment);

            var controller = new CommentController(
                commentRepository.Object,
                null!,
                null!,
                null!
            );

            // Act
            var result = await controller.Delete(1);

            // Assert
            Assert.IsType<NoContentResult>(result);

            commentRepository.Verify(
                repo => repo.Delete(1),
                Times.Once);
        }

        [Fact]
        public async Task Create_ReturnsCreated_WhenStockExists()
        {
            // Arrange
            var stock = new Stock
            {
                Id = 1,
                Symbol = "AAPL",
                Name = "Apple"
            };

            var commentDto = new CreateCommentDto
            {
                Title = "Great stock",
                Content = "I like Apple"
            };

            var user = new AppUser
            {
                Id = "user-1",
                UserName = "testuser"
            };

            var commentRepository = new Mock<ICommentRepository>();
            var stockRepository = new Mock<IStockRepository>();
            var alphaVantageService = new Mock<IAlphaVantageService>();

            stockRepository
                .Setup(repo => repo.GetBySymbolAsync("AAPL"))
                .ReturnsAsync(stock);

            commentRepository
                .Setup(repo => repo.CreateAsync(It.IsAny<Comment>()))
                .ReturnsAsync((Comment comment) =>
                {
                    comment.AppUser = user;
                    return comment;
                });
            var userStore =
                new Mock<IUserStore<AppUser>>();

            var userManager =
                new Mock<UserManager<AppUser>>(
                    userStore.Object,
                    null!,
                    null!,
                    null!,
                    null!,
                    null!,
                    null!,
                    null!,
                    null!
                );

            userManager
                .Setup(manager => manager.FindByNameAsync("testuser"))
                .ReturnsAsync(user);

            var controller = new CommentController(
                commentRepository.Object,
                stockRepository.Object,
                userManager.Object,
                alphaVantageService.Object
            );

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            controller.ControllerContext.HttpContext.User =
                new ClaimsPrincipal(
                    new ClaimsIdentity(
                        new[]
                        {
                            new Claim(
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
    "testuser")
                        }
                    )
                );

            // Act
            var result =
                await controller.Create("AAPL", commentDto);

            // Assert
            var createdResult =
                Assert.IsType<CreatedAtActionResult>(result);

            Assert.Equal(
                nameof(CommentController.GetById),
                createdResult.ActionName);

            commentRepository.Verify(
                repo => repo.CreateAsync(It.IsAny<Comment>()),
                Times.Once);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenStockDoesNotExist()
        {
            // Arrange
            var commentDto = new CreateCommentDto
            {
                Title = "Great stock",
                Content = "I like this stock"
            };

            var commentRepository = new Mock<ICommentRepository>();
            var stockRepository = new Mock<IStockRepository>();
            var alphaVantageService = new Mock<IAlphaVantageService>();

            stockRepository
                .Setup(repo => repo.GetBySymbolAsync("INVALID"))
                .ReturnsAsync((Stock?)null);

            alphaVantageService
                .Setup(service => service.FindStockBySymbolAsync("INVALID"))
                .ReturnsAsync((Stock?)null);

            var controller = new CommentController(
                commentRepository.Object,
                stockRepository.Object,
                null!,
                alphaVantageService.Object
            );

            // Act
            var result = await controller.Create("INVALID", commentDto);

            // Assert
            var badRequestResult =
                Assert.IsType<BadRequestObjectResult>(result);

            Assert.Equal(
                "Stock does not exists",
                badRequestResult.Value);
        }

    }
}