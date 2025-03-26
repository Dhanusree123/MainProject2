"use client";

import { PostsUsers } from "@/sections/post/Posts";
import { IPost } from "@/types/post";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const PostsUsersPage = ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const param = React.use(params);

  // console.log(param);
  useEffect(() => {
    console.log("clicked");
    const fetchPostsalbums = async () => {
      const fetchedPostsalbums = await PostsUsers(Number(param.userId));
      setPosts(fetchedPostsalbums.postsusers);
      console.log(fetchedPostsalbums);
    };
    fetchPostsalbums();
  }, [param.userId]);

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Posts with userId - {param.userId}
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid size={{ xs: 6, md: 4, lg: 3 }} key={post.id}>
            <Card>
              <Box
                sx={{ border: "1px solid black", pt: 5, pb: 5, pr: 3, pl: 3 }}
              >
                {post.id}
              </Box>
              <CardContent>
                <Link href={`/posts/${post.id}`}>
                  <Typography variant="body1">Post Id : {post.id}</Typography>
                </Link>
                <Link href={`/users/${post.userId}`}>
                  <Typography variant="body1">
                    User Id : {post.userId}
                  </Typography>
                </Link>
                <Typography variant="body1">
                  Post Title : {post.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PostsUsersPage;
