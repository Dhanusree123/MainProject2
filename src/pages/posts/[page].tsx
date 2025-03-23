import { IPost } from "@/types/post";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import CustomPagination from "@/components/CustomPagination";
import Link from "next/link";

type PostProps = {
  posts: IPost[];
  page: number;
};

const rowsPerPage = 20;

const AlbumPage = ({ posts, page }: PostProps) => {
  return (
    <Box>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h4">Posts</Typography>
      </Box>
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>UserId</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.userId}</TableCell>
                <TableCell>{post.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Grid container spacing={3} sx={{ p: 3 }}>
        {posts.map((post) => (
          <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={post.id}>
            <Card
              sx={{
                height: "100%", // Ensures equal height for all cards
                display: "flex",
                width: "350px",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ID: {post.id}
                </Typography>
                <Typography variant="subtitle1">
                  User ID: {post.userId}
                </Typography>
                <Typography variant="body2">{post.title}</Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link href={`/posts/${post.id}`}>View</Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box>
        <CustomPagination count={Math.ceil(100 / rowsPerPage)} page={page} />
      </Box>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = 100;
  const totalPages = Math.ceil(totalPosts / rowsPerPage);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params?.page as string) || 1;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${
      (page - 1) * rowsPerPage
    }&_limit=${rowsPerPage}`
  );
  console.log(params);
  const posts = await res.data;

  return { props: { posts, page } };
};

export default AlbumPage;
