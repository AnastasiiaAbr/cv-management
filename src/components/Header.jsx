import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}
        >
          CareerPortal
        </Typography>
        <Box>
          <Button
            color='inherit'
            component={Link} to='/'>
            Home
          </Button>
          <Button
            color='inherit'
            component={Link} to='/positions'>
            Positions
          </Button>
          <Button
            color='inherit'
            component={Link} to='/cvs'>
            CVs
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}