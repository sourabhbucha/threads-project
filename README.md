# Threads Task

### Technologies Used:

#### Backend and Database

- Node.js (**v20**)
- TypeScript
- Express.js
- GraphQL
- PostgreSQL
- Sequelize
- Jest

#### Frontend

- React
- TypeScript
- Apollo

## Docker Setup

1. **Set Up Environment Variables**: Once the repository is cloned, create an `.env` file in the root directory of the `backend` project with the following variables:
   ```
   DB_HOST = postgres
   DB_USER = test
   DB_PASSWORD = test
   DB_NAME = test
   DB_PORT = 5432
   PORT = 4000
   ```
2. **Docker Setup**: Install [Docker Engine](https://docs.docker.com/engine/install/)
3. **Docker Run Commend**: Run the project using the following command
   ```javascript
   docker-compose up
   ```

# If Docker is not installed

## Backend Setup

### Database

1. **Install Database (PostgreSQL)**: Download and install PostgreSQL from the [official site](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). Using pgAdmin for database management is highly recommended.
2. **Create a Database**: After the installation, set up a new database for the project.
3. **Set Up Environment Variables**: Once the repository is cloned, create an `.env` file in the root directory of the `backend` project with the following variables:

   ```
   DB_HOST = localhost
   DB_USER = test
   DB_PASSWORD = test
   DB_NAME = test
   DB_PORT = 5432
   PORT = 4000
   ```

### Backend Project Installation and Execution

1. **Install Dependencies**: Use [npm](https://docs.npmjs.com/) to install all required dependencies. Navigate to the root folder and run the following command:

   ```bash
   # Install dependencies in backend directory
   npm install
   ```

2. **Launch the Backend Server**: Start the server using this command:

   ```bash
   # Run the server from the backend directory
   npm run start
   ```

## Frontend Setup

1. **Install Dependencies**: Use [npm](https://docs.npmjs.com/) to install all required dependencies. Navigate to the frontend folder and run the following command:

   ```bash
   # Install dependencies in Frontend directory
   npm install
   ```

2. **Launch the Frontend Server**: Start the server using this command:

   ```bash
   # Run the server from the Frontend directory
   npm run start
   ```
