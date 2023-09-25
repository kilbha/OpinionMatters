"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGraphqlServer = void 0;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const queries_1 = require("./queries");
const resolvers_1 = require("./resolvers");
const mutations_1 = require("./mutations");
const helmet_1 = __importDefault(require("helmet"));
const startGraphqlServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    // app.use(morgan("combined"));
    const graphqlServer = new server_1.ApolloServer({
        typeDefs: `
      ${types_1.types}
    
      ${queries_1.queries}

      ${mutations_1.mutations}

      input CreateUserInput {
        firstName: String!
        lastName: String
        email: String!
      }
      `,
        resolvers: {
            Query: Object.assign({}, resolvers_1.resolvers.queries),
            Mutation: Object.assign({}, resolvers_1.resolvers.mutations),
        },
    });
    yield graphqlServer.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(graphqlServer));
    return app;
});
exports.startGraphqlServer = startGraphqlServer;
