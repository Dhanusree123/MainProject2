import CustomContainer from "@/components/CustomContainer";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { Box } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          display: "flex",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomContainer>
          <Component {...pageProps} />
        </CustomContainer>
      </Box>
    </Box>
  );
}
