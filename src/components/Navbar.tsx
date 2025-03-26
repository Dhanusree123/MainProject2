"use client";
import { Box, Button } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", m: 3 }}>
      <Button variant="contained" href="/">
        Home
      </Button>
    </Box>
  );
};

export default Navbar;
