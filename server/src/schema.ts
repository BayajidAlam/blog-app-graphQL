export const typeDefs = `#graphql
  type Query{
    me: User,
    users: [User],
    posts: [Post],
    profile(
      userId: ID!
    ): Profile
  }

  type Mutation{
    signup(
      name: String!,
      email: String!,
      password: String!
      bio: String
    ):AuthPayload,

    signin(
      email: String!,
      password: String!
    ):AuthPayload,

    addPost(
      post: postInput!
    ):postPayload,

    updatePost(
      postId: ID!,
      post: postInput
    ):postPayload,

    deletePost(
      postId: ID!,
    ):postPayload,

    publishPost(
      postId: ID!,
    ):postPayload,
  }

  type Post{
    id: ID!
    title: String!
    content: String!
    author: User
    createdAt : String!
    published: Boolean!
  }

  type User{
    id: ID!
    name: String!
    email: String!
    createdAt : String!
    posts: [Post]
  }

  type Profile{
    id: ID!
    bio: String!
    createdAt : String!
    user: User!
  }

  type AuthPayload{
    userError: String,
    token: String
  }

  type postPayload{
    userError: String,
    post: Post
  }

  input postInput{
    title: String,
    content: String
  }
`;
