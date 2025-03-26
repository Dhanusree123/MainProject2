"use client";

import { TodosUsers } from "@/sections/todo/Todos";
import { ITodo } from "@/types/todo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TodosUsersPage = ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const param = React.use(params);

  useEffect(() => {
    const fetchTodosUsers = async () => {
      const fetchedTodosUsers = await TodosUsers(Number(param.userId));
      setTodos(fetchedTodosUsers.todosusers);
    };
    fetchTodosUsers();
  }, [param.userId]);

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Todos with userId - {param.userId}
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
                    <Typography>Id - {todo.id}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/users/${todo.userId}`}>
                    <Typography>User Id - {todo.userId}</Typography>
                  </Link>
                </TableCell>
                <TableCell>Title - {todo.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TodosUsersPage;
