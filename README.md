# Social Media Analytics Platform

This project implements a microservice-based social media analytics platform that allows users to create social media posts and retrieve their analysis.

## Project Definition
The platform is designed to handle social media data, providing functionalities for post creation and analysis. It utilizes Node.js with Express.js for the backend, MongoDB as the database for storing posts, and Redis for caching post analysis.

### Features
- **Post Creation Endpoint**: Allows users to create new posts with text content and unique identifiers.
- **Post Analysis Endpoint**: Provides analysis for posts, including word count and average word length.

## Setup and Run Instructions
### Prerequisites
Ensure you have the following installed:
- Node.js and npm
- MongoDB
- Redis

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/social-media-analytics.git
   cd social-media-analytics



---------------------------------------------------

Configuration
Environment Setup:
Create a .env file based on the .env.example provided.
Update the MongoDB and Redis connection details in the .env file.
Running the Application
Start the Application:

bash
Copy code
npm start
Accessing API Endpoints:

Use POST /api/v1/posts/ to create a new post with a JSON payload containing text content and a unique identifier.
Use GET /api/v1/posts/{id}/analysis/ to retrieve analysis for a post by ID, including word count and average word length.
Assumptions and Decisions
Database Choice: Chose MongoDB due to its scalability and flexibility with unstructured data.
Auto-Scaling: Utilized AWS auto-scaling for efficiently handling increased traffic.
