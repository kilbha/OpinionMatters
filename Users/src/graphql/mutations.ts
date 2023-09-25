export const mutations = `
    type Mutation {
        createUser(user:CreateUserInput!): User
        send_signup_email(input:signupInput!):String
    }
`;
