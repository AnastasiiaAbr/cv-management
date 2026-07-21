import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button
          component={Link}
          to="/"
          color="inherit"
          sx={{
            flexGrow: 1,
            justifyContent: "flex-start",
            fontSize: "2rem",
            fontWeight: 500,
            textTransform: "none",
          }}
        >
          CareerPortal
        </Button>
        <Box>
          <Button
            color='inherit'
            component={Link} to='/positions'
            sx={{
              fontSize: '1.1rem'
            }}
          >
            Positions
          </Button>
          <Button
            color='inherit'
            component={Link} to='/attributes'
            sx={{
              fontSize: '1.1rem'
            }}>
            Attribute library
          </Button>
          <Button
            color='inherit'
            component={Link} to='/profile'
            sx={{
              fontSize: '1.1rem'
            }}>
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}