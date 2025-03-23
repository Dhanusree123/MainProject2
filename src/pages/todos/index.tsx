"use client";
import { ITodo } from "@/types/todo";
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
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [page, setPage] = useState(1);

  const rowsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_start=${
          (page - 1) * rowsPerPage
        }&_limit=${rowsPerPage}`
      );
      setTodo(response.data);
    };
    fetchData();
  }, [page]);

  return (
    <Box>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h4">Todos</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.title}</TableCell>
                <TableCell>
                  {u.completed === true ? "Completed" : "Not Completed"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(200 / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UserList;
