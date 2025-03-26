"use client";

import { Comments, Post } from "@/sections/post/Posts";
import { IComment } from "@/types/comment";
import { IPost } from "@/types/post";
import { Box, Card, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PostPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);

  const param = React.use(params);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await Post(param.id);
      setPost(fetchedPost.data);
    };
    fetchPost();
  }, [param.id]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await Comments(param.id);
      setComments(fetchedComments.comments);
    };
    fetchComments();
  }, [param.id]);

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Post - {post?.id}
      </Typography>
      <Box>Post Id - {post?.id}</Box>
      <Box>Post Title - {post?.title}</Box>
      <Box>Post Body - {post?.body}</Box>
      <Box>
        <Link href={`/users/${post?.userId}`}>
          <Typography>User Id - {post?.userId}</Typography>
        </Link>
      </Box>

      <Typography variant="h5">
        Comments realted to Post - {post?.id}
      </Typography>
      <Box>
        {comments.map((comment) => (
          <Card key={comment.id}>
            <Box>Comment Id - {comment.id}</Box>
            <Box>Post Id - {comment.postId}</Box>
            <Box>Comment Name - {comment.name}</Box>
            <Box>Comment Name - {comment.email}</Box>
            <Box>Comment Body - {comment.body}</Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default PostPage;
