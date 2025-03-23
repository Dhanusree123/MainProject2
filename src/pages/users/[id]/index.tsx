// import React from "react";

// const UserPage = () => {
//   return <></>;
// };

// export default UserPage;

import { Box, Typography } from "@mui/material";
import React from "react";
import { IUser } from "@/types/user";
import Link from "next/link";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";

type UserProps = {
  user: IUser;
};

const UserPage = ({ user }: UserProps) => {
  return (
    <Box sx={{ p: 5 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4">User Details</Typography>
      </Box>
      <Box sx={{ p: 3, textAlign: "left", ml: "50px" }}>
        <Typography variant="h6">User ID: {user.id}</Typography>
        <Typography variant="h6">Name: {user.name}</Typography>
        <Typography variant="h6">Username: {user.username}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Address :</Typography>
        <Box sx={{ ml: 5 }}>
          <Typography variant="body2">{user.address.suite}</Typography>
          <Typography variant="body2">{user.address.street}</Typography>
          <Typography variant="body2">{user.address.city}</Typography>
          <Typography variant="body2">{user.address.zipcode}</Typography>
          <Typography variant="body2">{user.phone}</Typography>
          <Typography variant="body2">{user.website}</Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Other details</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ border: "1px solid black" }}>Posts</Box>
          <Link href={`/posts`}>View</Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ border: "1px solid black" }}>Albums</Box>
          <Link href={`/albums`}>View</Link>
        </Box>
      </Box>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  const users: IUser[] = res.data;

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userRes = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${params?.id}`
  );
  const user: IUser = userRes.data;

  return { props: { user } };
};

export default UserPage;
