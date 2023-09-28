export const mutations = `
    type CreatedResponse{
        user:User
        errors:Error
    }
    
    type Mutation {
        createUser(firstName:String, lastName:String, email:String!, password:String!): CreatedResponse
        send_signup_email(input:signupInput!):String
    }
`;
