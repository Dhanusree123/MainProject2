// import { Box } from "@mui/material";
// import React from "react";

// const Sidebar = () => {
//   return <Box></Box>;
// };

// export default Sidebar;

"use client";

import { Album, Comment, Photo, PostAdd } from "@mui/icons-material";
import {
  CssBaseline,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PersonIcon from "@mui/icons-material/Person";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useRouter } from "next/router";

import React from "react";

const drawerWidth = 200;

const OPTIONS = [
  { icon: <Album />, name: "Albums", path: "/albums" },
  { icon: <Comment />, name: "Comments", path: "/comments/1" },
  { icon: <Photo />, name: "Photos", path: "/photos" },
  { icon: <PostAdd />, name: "Posts", path: "/posts/1" },
  { icon: <PlaylistAddIcon />, name: "Todos", path: "/todos" },
  { icon: <PersonIcon />, name: "Users", path: "/users" },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            pt: 3,
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {OPTIONS.map((option, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{ pt: 2 }}
                onClick={() => router.push(option.path)}
              >
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.name}></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
