# HelpDeskAPI

This is the backend API for the Helpdesk project. It provides various endpoints to manage helpdesk tickets, users, and other related data.

## Features

- Create, update, and delete helpdesk tickets
- User authentication and authorization
- Retrieve ticket details and status
- Admin and user roles management

## Technologies Used

- Node.js
- Express
- MongoDB
- JWT for authentication

## Installation

1. Clone the repository:
   `git clone https://github.com/SiripongPadkhuntod/HelpDeskAPI.git`

2. Navigate to the project directory:
    `cd HelpDeskAPI`

3. Install dependencies:
    `npm install`

## Usage
1. Create a .env file in the root directory and add the following environment variables:

    ```
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

2. Start the server:
`npm start`
3. The API will be accessible at http://localhost:3000.

# Endpoints
### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
## Tickets
- POST /api/tickets - Create a new ticket
- GET /api/tickets - Get all tickets
- GET /api/tickets/:id - Get a ticket by ID
- PUT /api/tickets/:id - Update a ticket
- DELETE /api/tickets/:id - Delete a ticket
Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.


