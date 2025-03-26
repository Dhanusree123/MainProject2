import { Container } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const CustomContainer = ({ children }: Props) => {
  return (
    <Container maxWidth="lg" sx={{ height: "auto", p: 5 }}>
      {children}
    </Container>
  );
};

export default CustomContainer;
