import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { types } from "./types";
import { queries } from "./queries";
import { resolvers } from "./resolvers";
import { mutations } from "./mutations";
import morgan from "morgan";

export const startGraphqlServer = async () => {
  const app = express();

  app.use(express.json());
  // app.use(morgan("combined"));
  const graphqlServer = new ApolloServer<any>({
    typeDefs: `
      ${types}
    
      ${queries}

      ${mutations}

      input CreateUserInput {
        firstName: String!
        lastName: String
        email: String!
      }
      `,
    resolvers: {
      Query: {
        ...resolvers.queries,
      },
      Mutation: {
        ...resolvers.mutations,
      },
    },
  });

  await graphqlServer.start();
  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
};
