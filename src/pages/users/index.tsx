"use client";
import { IUser } from "@/types/user";
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_start=${
          (page - 1) * rowsPerPage
        }&_limit=${rowsPerPage}`
      );
      setUser(response.data);
    };
    fetchData();
  }, [page]);

  return (
    <Box>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h4">Users</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>{u.website}</TableCell>
                <TableCell>
                  <Box
                    sx={{ border: "1px solid black", p: 2, bgcolor: "#757de8" }}
                  >
                    <Link href={`/users/${u.id}`}>View</Link>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(10 / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UserList;
