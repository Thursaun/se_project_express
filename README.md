## WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. This project provides the server-side functionality required for the WTWR app, including managing user data, clothing items, and implementing secure user authorization. The ultimate goal is to build a robust API and implement user authentication and authorization mechanisms.

## Project Functionality

The WTWR back-end includes the following features:
	•	User Management: Create, retrieve, and manage user data, including secure password hashing and authentication.
	•	Clothing Item Management: Add, retrieve, update, and delete clothing items, including linking items to their respective owners.
	•	Likes Functionality: Allow users to like or unlike clothing items.
	•	Validation and Error Handling: Implement validation for user input and proper error handling to return meaningful messages to clients.
	•	Database Integration: Use MongoDB to store and manage data persistently.

## Technologies and Techniques Used

The project uses the following technologies and tools:
	•	Node.js: JavaScript runtime for building the server-side application.
	•	Express.js: Web framework to simplify routing and server logic.
	•	MongoDB & Mongoose: Database and object modeling for storing and managing user and clothing data.
	•	Validator: For input validation, including checking URLs.
	•	Nodemon: For hot reloading during development.
	•	ESLint with Airbnb Style Guide: For linting and maintaining consistent coding standards.
	•	Git & GitHub: For version control and collaboration.

## Running the Project

Use the following commands to run the project:
	•	npm run start — Launch the server in production mode.
	•	npm run dev — Launch the server with hot reload for development.

## Testing

Before committing your code, ensure the file sprint.txt in the root folder contains the number of the current sprint you’re working on (e.g., 12).

To test the project, use Postman or any API testing tool to interact with the server endpoints, ensuring all functionality works as intended.
