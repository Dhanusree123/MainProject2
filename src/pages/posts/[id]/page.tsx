import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { IPost } from "@/types/post";
import { IComment } from "@/types/comment";

type PostProps = {
  post: IPost;
  comments: IComment[];
};

const PostPage = ({ post, comments }: PostProps) => {
  //   console.log(photos);
  return (
    <Box>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h4">Post : {post.id}</Typography>
      </Box>
      <Box
        sx={{
          textAlign: "left",
          ml: "50px",
          p: 5,
        }}
      >
        <Typography variant="h6"> Post Id: {post.id}</Typography>
        <Typography variant="h6"> User Id : {post.userId}</Typography>
        <Typography variant="h6"> Post Title : {post.title}</Typography>
      </Box>

      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h5">Comments for this Post</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            mt: 3,
          }}
        >
          {comments.map((comment) => (
            <Card
              key={comment.id}
              sx={{
                width: "90%",
                maxWidth: "600px",
                padding: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="body2">
                  <b>Name : </b>
                  {comment.name}
                </Typography>
                <Typography variant="body2">
                  <b>Email : </b>
                  {comment.email}
                </Typography>
                <Typography variant="body2">
                  <b>Body : </b>
                  {comment.body}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 5 }}>
        <Link href={"/comments"}>View In Comments</Link>
      </Box>
    </Box>
  );
};

export const getStaticProps = async ({ params }) => {
  const res1 = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post: IPost = await res1.json();

  const res2 = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${params.id}`
  );
  const comments: IComment[] = await res2.json();

  return { props: { post, comments } };
};

export const getStaticPaths = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts: IPost[] = await res.data;

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export default PostPage;
