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
    }
}