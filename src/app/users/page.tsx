"use client";
import React, { useEffect, useState } from "react";
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
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import Users from "@/sections/user/Users";
import { IUser } from "@/types/user";
import Link from "next/link";

const TodosList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`?page=${value}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await Users(page);
      setUsers(fetchedUsers.data);
      setTotalCount(fetchedUsers.totalCount);
      setRowsPerPage(fetchedUsers.rowsPerPage);
    };
    fetchUsers();
  }, [page]);

  return (
    <Box>
      <Typography variant="h3" textAlign="center">
        Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link href={`/users/${user.id}`}>
                    <Typography>{user.id}</Typography>
                  </Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.website}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalCount / rowsPerPage}
          page={page}
          onChange={handleChange}
          color="primary"
          disabled={page > totalCount / rowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default TodosList;
