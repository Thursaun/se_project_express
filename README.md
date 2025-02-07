## WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. This project provides the server-side functionality required for the WTWR app, including managing user data, clothing items, and implementing secure user authorization. The ultimate goal is to build a robust API and implement secure authentication and authorization mechanisms.

## Domain Names
	•	Frontend Domain:
https://www.ootd.jumpingcrab.com
	•	Backend API Domain:
https://api.ootd.jumpingcrab.com

## Project Functionality

The WTWR back-end includes the following features:
	•	User Management:
Create, retrieve, and manage user data, including secure password hashing and authentication.
	•	Clothing Item Management:
Add, retrieve, update, and delete clothing items, with items linked to their respective owners.
	•	Likes Functionality:
Allow users to like or unlike clothing items.
	•	Validation and Error Handling:
Validate user input using Celebrate/Validator and implement centralized error handling middleware that returns meaningful error messages and HTTP status codes.
	•	Secure JWT Authentication:
Generate and use cryptographically strong JSON Web Tokens (JWT) with secrets managed via environment variables.
	•	Database Integration:
Persistently store and manage data using MongoDB and Mongoose.
	•	Automated Testing:
Utilize automated tests (using your preferred test runner) to ensure endpoint functionality.
	•	Cloud Deployment:
Deploy the back end on Google Cloud, using a reverse proxy (e.g., Nginx) to route traffic from the API subdomain.

## Technologies and Tools
	•	Node.js: JavaScript runtime for building the server-side application.
	•	Express.js: Web framework to simplify routing and server logic.
	•	MongoDB & Mongoose: Database and object modeling for persistent data storage.
	•	Celebrate/Validator: For validating input data.
	•	JSON Web Tokens (JWT): For secure user authentication and authorization.
	•	dotenv: For loading environment variables (including sensitive data like JWT secrets).
	•	Nginx: Reverse proxy to forward requests from the API subdomain to the backend.
	•	Google Cloud Platform: Hosting and deployment of the backend server.
	•	PM2: Process manager to ensure the application remains running in production.
	•	Nodemon: For hot reloading during development.
	•	ESLint (Airbnb Style Guide): For consistent code quality and style.
	•	Git & GitHub: For version control and collaboration.

## Google Cloud Setup

	•	Deployment:
The backend is deployed on Google Cloud. Configure your server instance with the necessary environment variables.
	•	Nginx & SSL:
Use Nginx to forward requests from https://api.ootd.jumpingcrab.com to http://localhost:3001. SSL is configured (typically using Certbot) to ensure secure HTTPS connections.

## Error Handling

	•	Centralized Error Middleware:
All errors are caught by a central Express error handling middleware which logs the error and sends a meaningful response to the client.
	•	Validation:
Input validation is performed using Celebrate and custom validators. If validation fails, a 400 error with a descriptive message is returned.
	•	Logging:
Errors are logged using middleware such as Express-Winston, making it easier to troubleshoot issues in production.
	•	Meaningful Responses:
The API returns appropriate HTTP status codes (e.g., 400, 401, 404, 500) along with descriptive error messages.

## Testing

	•	Manual Testing:
Use Postman or similar API testing tools to interact with your endpoints. Ensure each endpoint responds correctly.
	•	Sprint Check:
Before committing changes, update the sprint.txt file in the root folder with the current sprint number.
	•	Automated Testing:
Run your test suite (if configured) using your preferred test runner to ensure functionality remains intact.

## Repository Structure

	•	/controllers: Contains controller functions for handling API requests.
	•	/middlewares: Custom middleware for error handling, logging, etc.
	•	/models: Mongoose models for users and clothing items.
	•	/routes: Route definitions for the API.
	•	/utils: Utility functions and configuration (e.g., JWT generation, environment setup).
	•	app.js: The main application entry point.
