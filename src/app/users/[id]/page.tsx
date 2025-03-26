"use client";
import { User } from "@/sections/user/Users";
import { IUser } from "@/types/user";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const UserPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const param = React.use(params);
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await User(param.id);
      setUser(fetchedUser.data);
    };
    fetchUser();
  }, [param.id]);

  return (
    <Box>
      <Typography variant="h4" textAlign="center">
        User - {user?.id}
      </Typography>
      <Box>Id - {user?.id}</Box>
      <Box>Name - {user?.name}</Box>
      <Box>Username - {user?.username}</Box>
      <Box sx={{ p: 1, m: 1 }}>
        <Typography variant="h6">Address</Typography>
        <Box>Suite - {user?.address.suite}</Box>
        <Box>Street - {user?.address.street}</Box>
        <Box>City - {user?.address.city}</Box>
        <Box>Geo-lat - {user?.address.geo.lat}</Box>
        <Box>Geo-lng - {user?.address.geo.lng}</Box>
        <Box>zipcode - {user?.address.zipcode}</Box>
      </Box>

      <Box sx={{ p: 1, m: 1 }}>
        <Typography variant="h6">Company</Typography>
        <Box>Name - {user?.company.name}</Box>
        <Box>bs - {user?.company.bs}</Box>
        <Box>catchPhrase - {user?.company.catchPhrase}</Box>
      </Box>

      <Box>Email - {user?.email}</Box>
      <Box>Phone - {user?.phone}</Box>
      <Box>Website - {user?.website}</Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            m: 5,
            p: 3,
            border: "1px solid black",
            textAlign: "center",
            width: "200px",
          }}
        >
          <Button href={`/posts/userId/${user?.id}`}>View Posts</Button>
        </Box>
        <Box
          sx={{
            m: 5,
            p: 3,
            border: "1px solid black",
            textAlign: "center",
            width: "200px",
          }}
        >
          <Button href={`/albums/userId/${user?.id}`}>View Albums</Button>
        </Box>
        <Box
          sx={{
            m: 5,
            p: 3,
            border: "1px solid black",
            textAlign: "center",
            width: "200px",
          }}
        >
          <Button href={`/todos/userId/${user?.id}`}>View Todos</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
