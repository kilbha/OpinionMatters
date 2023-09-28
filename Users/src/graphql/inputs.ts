export const input = `
    input signupInput {
        toEmail: String! 
        html: String!
        subject: String!
        role: String!
        exp: String!
    }

    input CreateUserInput {
        firstName: String
        lastName: String
        email: String!
        password: String!
    }   

  `;

//! means non nullable field
