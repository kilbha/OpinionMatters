"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `
    type User {
        id:String!
        firstName:String
        lastName:String
        email:String
        password:String
    }
    
    type Error{
        message: String
        status_code: Int
    }

    `;
