// import { IPost } from "@/types/post";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import axios from "axios";
// import React from "react";
// import CustomPagination from "../albums/Pagination";
// import { GetStaticPaths, GetStaticProps } from "next";

// type PostProps = {
//   posts: IPost[];
//   page: number;
// };

// const rowsPerPage = 10;

// const AlbumPage = ({ posts, page }: PostProps) => {
//   return (
//     <Box>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>UserId</TableCell>
//               <TableCell>Title</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {posts.map((post) => (
//               <TableRow key={post.id}>
//                 <TableCell>{post.id}</TableCell>
//                 <TableCell>{post.userId}</TableCell>
//                 <TableCell>{post.title}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box>
//         <CustomPagination count={Math.ceil(100 / rowsPerPage)} page={page} />
//       </Box>
//     </Box>
//   );
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const totalPosts = 100;
//   const totalPages = Math.ceil(totalPosts / rowsPerPage);

//   const paths = Array.from({ length: totalPages }, (_, i) => ({
//     params: { page: (i + 1).toString() },
//   }));

//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const page = parseInt(params?.page as string) || 1;
//   const res = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts?_start=${
//       (page - 1) * rowsPerPage
//     }&_limit=${rowsPerPage}`
//   );
//   console.log(params);
//   const posts = await res.data;

//   return { props: { posts, page } };
// };

// export default AlbumPage;
