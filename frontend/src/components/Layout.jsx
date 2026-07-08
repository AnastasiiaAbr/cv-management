import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f7",
      }}
    >
      <Header />

      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}