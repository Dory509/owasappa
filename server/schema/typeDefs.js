const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    imageUrl: String
    author: User!
  }

  type Query {
    users: [User]
    posts: [Post]  
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createPost(title: String!, content: String!, imageUrl: String): Post
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;