export const queries = `
        type Query {
            getAllUsers: [User]
            getUserByEmail(email:String!):User
        }
`;
