import { Container } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
    <Header />
    <Container sx={{mt: 4}}>
      <Outlet />
    </Container>
    </>
  )
}