// import { Box, Container } from "@mui/material";
// import React from "react";

// type Props = {
//   children: React.ReactNode;
// };
// const CustomContainer = ({ children }: Props) => {
//   return (
//     <Box>
//       <Container sx={{ border: "1px solid black" }}>{children}</Container>
//     </Box>
//   );
// };

// export default CustomContainer;

import { Box, Container } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CustomContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        border: "1px solid blue",
        ml: 5,
        mr: 5,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          border: "1px solid violet",
          borderRadius: 2,
          m: 3,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default CustomContainer;
