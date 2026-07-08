import { Button, Paper, Stack, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Paper elevation={3}
      sx={{ p: 6, textAlign: 'center' }}>
      <Stack spacing={3} alignItems='center'>
        <Typography variant='h1' color="primary">
          404
        </Typography>
        <Typography variant="h4">
          Page not Found
        </Typography>
        <Typography color="text.secondary">
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          component={Link}
          to="/"
        >
          Home
        </Button>
      </Stack>
    </Paper>
  )
}