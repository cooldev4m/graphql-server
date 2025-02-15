// Apollo server dependencies
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// Express Server
import express from "express";
import http from "http";
import cors from "cors";

import "./db/index.js";
import UserRouter from "./routes/user.js";

// GraphQL Schemas
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import Employee from "./db/employee.js";
import Employees from "./graphql/data.js";

const dataSources = () => ({
  employees: new Employees(Employee),
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", UserRouter);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token,
      dataSources: {
        employees: new Employees({ modelOrCollection: Employee }),
      },
    }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
