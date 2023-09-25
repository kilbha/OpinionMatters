"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `
        type Query {
            getAllUsers: [User]
            getUserByEmail(email:String!):User
        }
`;
