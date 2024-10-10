import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import cors from "cors"; // Import the cors package
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import threadRoutes from "./routes/threadRoutes";
import reactionRoutes from "./routes/reactionRoutes";
import { initializeModels } from "./models";
import errorHandler from "./middleware/errorHandler";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes and origins
app.use(bodyParser.json());

// RESTful Routes
app.use("/api/threads", threadRoutes);
app.use("/api/reactions", reactionRoutes);

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  // Initialize Models and Sync with Database
  try {
    await initializeModels();
    console.log("Database synchronized successfully.");

    // Error Handling Middleware
    app.use(errorHandler);

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(
        `GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
};

startServer();
