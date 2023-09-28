"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    type CreatedResponse{
        user:User
        errors:Error
    }
    
    type Mutation {
        createUser(firstName:String, lastName:String, email:String!, password:String!): CreatedResponse
        send_signup_email(input:signupInput!):String
    }
`;
