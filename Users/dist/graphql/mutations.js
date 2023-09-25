"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    type Mutation {
        createUser(user:CreateUserInput!): User
        send_signup_email(input:signupInput!):String
    }
`;
