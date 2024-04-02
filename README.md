# Yarn Store

This is a Node.js API project built using Express, Sequelize, Passport, and Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js and npm installed
- Docker installed
- PostgreSQL or MySQL server (depending on your choice)
- Postman or any API testing tool

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

1. Install dependencies:

   ```bash
   cd project-name
   npm install
   ```

1. Create a .env file based on .env.example and configure the necessary variables.

## Environment Variables

The following environment variables are required:

- `NODE_ENV`: Node environment dev or prod (dev is default value when this is not defined)
- `PORT`: Port number for the server (3000 is default value)
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_HOST`: Database host
- `DB_NAME`: Database name
- `DB_PORT`: Database port
- `DB_DIALECT`: Database dialect (mysql, postgres, etc.)
- `API_KEY`: API key for external services
- `JWT_SECRET`: Secret key for JWT authentication
- `MAIL_HOST`: SMTP server host for sending emails
- `MAIL_PORT`: SMTP server port
- `MAIL_USER`: SMTP server username
- `MAIL_PASS`: SMTP server password

Example `.env` file:

```plaintext
NODE_ENV='development'
PORT=3000
DB_USER='admin'
DB_PASSWORD='password'
DB_HOST='localhost'
DB_NAME='mydatabase'
DB_PORT=5432
DB_DIALECT='postgres'
API_KEY='your_api_key'
JWT_SECRET='your_jwt_secret'
MAIL_HOST='smtp.example.com'
MAIL_PORT=587
MAIL_USER='email@example.com'
MAIL_PASS='email_password'
```

Make sure to create a .env file in the root directory of your project based on .env.example and configure the necessary variables according to your environment setup.

## Docker

Docker is used to create containers for the database and administration tools:

- PostgreSQL: `docker-compose up postgres pgadmin`
- MySQL: `docker-compose up mysql phpmyadmin`

Make sure to update the database configuration in `config/database.js` based on your choice of database.

## Usage

1. Start the server:

   ```bash
   npm start
   ```

1. Use Postman or any API testing tool to interact with the endpoints.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
