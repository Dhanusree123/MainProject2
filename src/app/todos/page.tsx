"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { ITodo } from "@/types/todo";
import Todos from "@/sections/todo/Todos";
import Link from "next/link";

const TodosList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`?page=${value}`);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await Todos(page);
      setTodos(fetchedTodos.data);
      setTotalCount(fetchedTodos.totalCount);
      setRowsPerPage(fetchedTodos.rowsPerPage);
    };
    fetchTodos();
  }, [page]);

  return (
    <Box>
      <Typography variant="h3" textAlign="center">
        Todos
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Todo ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>
                  <Link href={`/todos/${todo.id}`}>
                    <Typography>{todo.id}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/users/${todo.userId}`}>
                    <Typography>{todo.userId}</Typography>
                  </Link>
                </TableCell>
                <TableCell>{todo.title}</TableCell>
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
        />
      </Box>
    </Box>
  );
};

export default TodosList;
