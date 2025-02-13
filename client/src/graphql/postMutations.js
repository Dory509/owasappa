import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $image: String) {
    createPost(title: $title, content: $content, image: $image) {
      id
      title
      content
      image
      published
      author {
        id
        username
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      image
      published
      author {
        id
        username
      }
    }
  }
`;

// Ensure `PUBLISH_POST` is a Mutation, Not Query
export const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    publishPost(postId: $postId) {
      id
      title
      content
      image
      published
    }
  }
`;