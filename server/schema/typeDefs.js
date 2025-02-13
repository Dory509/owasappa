const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    image: String
    author: User!
    published: Boolean
  }

  type Query {
    users: [User]
    posts: [Post]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createPost(title: String!, content: String!, image: String): Post
    publishPost(postId: ID!): Post
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;