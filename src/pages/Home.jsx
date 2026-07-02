import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Typography variant='h3'>
          CareerPortal
        </Typography>
        <Typography variant='body1'>
          Create customizable job positions, manage candidate profiles,
          and generate CVs tailored for specific roles.
        </Typography>
        <Button
        variant='contained'
        component={Link}
        to='/positions'
        sx={{ width: 'fit-content'}}>
          View positions
        </Button>
      </Stack>
    </Paper>
  )
};