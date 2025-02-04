# User Management - Quantum IT

This project is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The app provides user authentication functionality, allowing users to register and log in using their credentials.


## Endpoints

### 1. **Login**

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }

Response:
200 OK: If login is successful, returns a success message along with the authentication token.

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
401 Unauthorized: If login fails, returns an error message.
```

```json
{
  "error": "Invalid email or password"
}
```
### 2. **Register**
- **URL:** /register
- **Method:** POST
- **Request Body:**
```json
   {
   "name": "User Name",
   "dob": "1990-01-01",
   "email": "user@example.com",
   "password": "userpassword"
   }
   ```

Response:
201 Created: If registration is successful, returns a success message.

```json
{
  "message": "Registration successful"
}
400 Bad Request: If the email already exists or if the input data is invalid, returns an error message.
```

```json
{
  "error": "Email already exists"
}
```
# Running the Application Locally
1. **Clone the Repository**
First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <project-directory>
```
2. **Install Dependencies**

Install the required dependencies for both the frontend and backend.
``json
Frontend (React):
```bash
cd frontend
npm install
```

### Backend (Node.js):
```bash
cd backend
npm install
```

3. **Set Up Environment Variables**
Both the frontend and backend use environment variables to handle sensitive information like API keys, database connections, and JWT secrets.

**Backend (server):**
Create a .env file in the root of the server directory and add the following:

```env
JWT_SECRET=<your-secret-key>
DATABASE_URL=<mongodb-url>
JWT_SECRET: This is a secret string used to sign and verify JWT tokens.
DATABASE_URL: The URL for your MongoDB instance. This is required for connecting to the database.
```

**Frontend (client):**
Create a .env file in the root of the client directory and add the following:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_URL: This URL points to the backend API that handles authentication requests (login/register). Make sure this matches your local backend server URL.
```

4. **Start the Development Server**
Frontend:
```bash
cd frontend
npm run dev
```
Backend:
```bash
cd backend
node server.js
```

The application should now be running locally. The frontend will be available at http://localhost:5173, and the backend at http://localhost:8080.

# Significance of Environment Variables
Environment variables are essential for keeping sensitive information secure and adaptable across different environments (development, production).

In this application:

JWT_SECRET: This secret key is used to sign and verify JWT tokens. It should be kept confidential, as it ensures the integrity and authenticity of the token.
DATABASE_URL: This is the connection string for your MongoDB database. It is important to avoid hardcoding it into the application code, as this could expose your database credentials to unauthorized users.
REACT_APP_API_URL: This points to the API that the frontend communicates with. Having it as an environment variable ensures that different environments (local, staging, production) can use different API URLs without changing the code.
By using environment variables, we make sure that we can easily configure the app for various environments while keeping sensitive data secure.



### How this README works:
- **Endpoints**: It explains how the login and registration API work with input and expected output.
- **Running Locally**: Guides you step by step on how to set up both frontend and backend locally.
- **Environment Variables**: Explains the importance of each variable, how they help keep the project configurable and secure, and what to include in the `.env` files.

This should cover the essentials of setting up your project, explaining the authentication fun