# FinSight - Full Stack Financial Portfolio Tracker


## Overview

**FinSight** is a full-stack financial portfolio tracking application built with **React, TypeScript, .NET 8 Web API, and SQL Server**.

The project was created to demonstrate modern full-stack development practices, including:

- REST API development
- Frontend and backend integration
- Database design with Entity Framework Core
- Containerized development with Docker
- CI/CD automation using GitHub Actions
- Cloud deployment using Azure

Users can manage their investment portfolio, search financial data, and interact with a responsive web application built using modern technologies.

---

## Live Demo

🌐 **Frontend:**  
https://finsight-frontend.icydune-9ce779a9.australiaeast.azurecontainerapps.io/


---

# Features

## Authentication

- User registration and login
- Secure authentication using ASP.NET Core Identity
- Protected API endpoints
- User-specific portfolio data

## Portfolio Management

- Create, view, update, and delete portfolio items
- Track owned assets
- Manage investment information through RESTful APIs

## Financial Data Integration

- Integration with external financial APIs
- Stock search functionality
- Financial information retrieval
- Fallback mock data handling when API limits are reached

## Responsive Frontend

- Modern React interface
- Mobile and desktop responsive design
- Interactive components and animations
- Form validation and error handling

---

# Tech Stack

## Frontend

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Redux Toolkit**
- **React Router**
- **React Hook Form**
- **Axios**

## Backend

- **.NET 8 Web API**
- **C#**
- **Entity Framework Core**
- **ASP.NET Core Identity**
- **RESTful API Architecture**

## Database

- **SQL Server**
- **Entity Framework Core Migrations**

## DevOps & Deployment

- **Docker**
- **Docker Compose**
- **GitHub Actions**
- **GitHub Container Registry**
- **Azure Container Apps**

---

# Application Architecture

```
React Frontend
      |
      | HTTP Requests
      |
.NET 8 Web API
      |
      |
Entity Framework Core
      |
      |
SQL Server Database
```

The application is separated into independent frontend and backend services.

Each service is containerized using Docker and deployed through a CI/CD pipeline.

---

# Docker Setup

The application includes Docker configuration for local development.

Services:

- React frontend container
- .NET API container
- SQL Server container

Run the application:

```bash
docker compose up
```

The containers communicate through a Docker network and provide a consistent development environment.

---

# CI/CD Pipeline

The project uses **GitHub Actions** to automate the deployment process.

Pipeline workflow:

```
Code Push
    |
    ↓
GitHub Actions Trigger
    |
    ↓
Build Docker Images
    |
    ↓
Push Images to GitHub Container Registry
    |
    ↓
Deploy Containers to Azure
```

Benefits:

- Automated builds
- Consistent deployments
- Reduced manual configuration
- Container-based delivery

---

# Project Structure

```
FinSight
│
├── FrontEnd
│   ├── React
│   ├── TypeScript
│   └── Tailwind CSS
│
├── FinSight.API
│   ├── Controllers
│   ├── Services
│   ├── Models
│   └── Data
│
├── docker-compose.yml
│
└── .github
    └── workflows
```

---

# Challenges & Learnings

During development, I worked through several real-world engineering challenges:

- Containerizing a multi-service application
- Creating a complete CI/CD deployment workflow
- Deploying full-stack applications to Azure

---

# Future Improvements

Potential future enhancements:

- Real-time stock price updates
- More advanced portfolio analytics
- Additional financial charts
- Improved API caching
- Automated testing coverage

---

# Author

**Rahul Ram**

