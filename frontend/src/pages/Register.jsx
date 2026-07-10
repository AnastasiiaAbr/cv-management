import { useState } from "react";
import { Paper, Stack, TextField, Typography, Button } from '@mui/material';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Paper elevation={3}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 6,
        p: 4,
      }}>
      <Stack
        component='form'
        spacing={3}
        onSubmit={handleSubmit}>
        <Typography variant="h4">
          Register
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
        />
        <Button
          type='submit'
          variant='contained'
        >
          Register
        </Button>
      </Stack>
    </Paper>
  )
}