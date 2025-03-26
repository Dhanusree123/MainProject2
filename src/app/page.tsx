import { Box, Button } from "@mui/material";
import React from "react";

const HomePage = () => {
  const BUTTONS = [
    { name: "Posts", path: "/posts" },
    { name: "Albums", path: "/albums" },
    { name: "Todos", path: "/todos" },
    { name: "Users", path: "/users" },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: 45,
      }}
    >
      {BUTTONS.map((button) => (
        <Button
          variant="contained"
          sx={{ m: 3, p: 2 }}
          href={button.path}
          key={button.path}
        >
          {button.name}
        </Button>
      ))}
    </Box>
  );
};

export default HomePage;
