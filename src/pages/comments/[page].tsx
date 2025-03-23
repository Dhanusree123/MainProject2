import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { IComment } from "@/types/comment";
import CustomPagination from "@/components/CustomPagination";

type CommentProps = {
  comments: IComment[];
  page: number;
};

const rowsPerPage = 20;

const CommentPage = ({ comments, page }: CommentProps) => {
  return (
    <Box>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h4">Comments</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id}</TableCell>
                <TableCell>{comment.name}</TableCell>
                <TableCell>{comment.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <CustomPagination count={Math.ceil(500 / rowsPerPage)} page={page} />
      </Box>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalComments = 500;
  const totalPages = Math.ceil(totalComments / rowsPerPage);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params?.page as string) || 1;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?_start=${
      (page - 1) * rowsPerPage
    }&_limit=${rowsPerPage}`
  );
  console.log(params);
  const comments = await res.data;

  return { props: { comments, page } };
};

export default CommentPage;
