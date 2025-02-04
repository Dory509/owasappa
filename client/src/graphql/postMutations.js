import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $image: String) {
    createPost(title: $title, content: $content, image: $image) {
      id
      title
      content
      image
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
      author {
        username
      }
    }
  }
`;
