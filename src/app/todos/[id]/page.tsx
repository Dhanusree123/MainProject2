"use client";

import { Todo } from "@/sections/todo/Todos";
import { ITodo } from "@/types/todo";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TodoPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const [todo, setTodo] = useState<ITodo | null>(null);
  const param = React.use(params);
  useEffect(() => {
    const fetchTodo = async () => {
      const fetchedTodo = await Todo(param.id);
      setTodo(fetchedTodo.data);
    };
    fetchTodo();
  }, [param.id]);

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Todo - {todo?.id}
      </Typography>
      <Box>Id - {todo?.id}</Box>
      <Box>Todo Title - {todo?.title}</Box>
      <Box>
        Status - {todo?.completed === true ? "Completed" : "not Completed"}
      </Box>
      <Box>
        <Link href={`/users/${todo?.userId}`}>User Id - {todo?.userId}</Link>
      </Box>
    </>
  );
};

export default TodoPage;
