import { useState } from "react";
import { Paper, Stack, TextField, Typography, Button, Snackbar, Alert } from '@mui/material';
import { registerUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match',
        severity: 'error'
      });
      return;
    }

    try {
      await registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      setSnackbar({
        open: true,
        message: 'Registration successful',
        severity: 'success',
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error',
      });
    }
  };

  return (
    <>
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
            label="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Last Name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
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

      <Snackbar
        open={snackbar.open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }}>
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}