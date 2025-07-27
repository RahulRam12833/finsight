# FinSight — React + .NET Full-Stack Finance Tracker

## Project Overview

FinSight is a full-stack finance tracking application built with a React frontend and a .NET backend. The goal is to learn and demonstrate practical skills in modern web development, including API design, frontend-backend integration, and deployment readiness.

---

## Current Progress

**Backend:**  
- Developed RESTful APIs for managing stock and finance data using .NET 8 Web API with **Entity Framework Core** and **Microsoft SQL Server**.  
- Implemented data seeding with placeholder stock data.  
- API endpoints tested successfully via **Swagger and Postman**.  
- Configured a **temporary permissive CORS policy** to enable smooth frontend integration during development.  
  > *Note: This CORS setup allows all origins and will be tightened before production.*

**Frontend:**  
- Built a minimal React application (using Vite) that fetches and displays data from the backend API.  
- Implemented API calls using `fetch` to demonstrate frontend-backend communication.  
- Encountered and resolved CORS issues during integration, currently using the temporary backend CORS fix.

---

## Database

- Using **Microsoft SQL Server** as the backend database for reliable and scalable data storage.  
- Integrated with the .NET backend via **Entity Framework Core** for efficient ORM and migration management.  
- Stores finance-related data including stocks, transactions, and user information.  
- Database connection configured through appsettings and supports local development and deployment environments.  
- Initial data seeded with placeholder stock records for testing and frontend integration.

---
## Docker

This project uses Docker to containerize the backend and frontend applications for consistent development and deployment environments.

### Backend

- The backend API is containerized with a multi-stage Dockerfile located at `BackEnd/FinSight.api/Dockerfile`.
- To build the backend Docker image:

  ```bash
  docker build -t finsight-api -f BackEnd/FinSight.api/Dockerfile .
- To run the backend container locally, exposing port 8080:
  ```bash
  docker run -p 8080:8080 finsight-api
- The API listens on http://localhost:8080 inside the container. HTTPS is disabled inside Docker for simplicity.

### Frontend(yet to be containerized)
---

## Technical Highlights

- Monorepo structure with separate backend and frontend folders for clean project organization.  
- CORS configured temporarily to allow all origins during local development; planned to tighten before production.  
- Use of Git branches and pull requests to manage backend and frontend development independently and integrate changes systematically.  
- Ready for next phases: Docker containerization, CI/CD pipelines, and deployment.

---

## Next Steps

- Refine CORS policy for production with environment-specific origins.  
- Enhance frontend UI and state management.  
- Containerize the application using Docker.  (
- Set up CI/CD workflows via GitHub Actions for automated testing and deployment.  
- Deploy to cloud platform (Azure, AWS, or similar).

---

## How to Run Locally

### Backend

```bash
cd backend
dotnet run
