"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Card, CardContent, Pagination, Typography } from "@mui/material";
import Posts from "@/sections/post/Posts";
import { IPost } from "@/types/post";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PostsList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`?page=${value}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await Posts(page);
      setPosts(fetchedPosts.data);
      setTotalCount(fetchedPosts.totalCount);
      setRowsPerPage(fetchedPosts.rowsPerPage);
    };
    fetchPosts();
  }, [page]);

  return (
    <Box>
      <Typography variant="h3" textAlign="center">
        Posts
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
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalCount / rowsPerPage}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PostsList;
