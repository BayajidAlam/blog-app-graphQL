import React from "react";
import PostCard from "./PostCard";
import { useQuery, gql } from "@apollo/client";
const GET_POST = gql`
  query AllPost {
    posts {
      title
      id
      author {
        name
        id
      }
      published
      createdAt
      content
    }
  }
`;
const Posts = () => {
  const { loading, error, data } = useQuery(GET_POST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h1 className="text-center font-bold text-5xl my-4 pb-4">Posts</h1>
      <hr />
      <div className="flex flex-wrap">
        {data?.posts.map((post, i) => (
          <PostCard key={i} post={post}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Posts;
