import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { types } from "./types";
import { queries } from "./queries";
import { resolvers } from "./resolvers";
import { mutations } from "./mutations";
import { input } from "./inputs";
import { errors } from "./errors";
import helmet from "helmet";
import cors from "cors";

import morgan from "morgan";

export const startGraphqlServer = async () => {
  const corsOptions = {
    origin: ["http://localhost:3000"],
  };
  const app = express();
  app.use(cors(corsOptions));
  app.use(express.json());
  // app.use(helmet());
  // app.use(morgan("combined"));
  const graphqlServer = new ApolloServer<any>({
    typeDefs: `           
      ${types}
    
      ${queries}

      ${mutations}
      
      ${input}

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
