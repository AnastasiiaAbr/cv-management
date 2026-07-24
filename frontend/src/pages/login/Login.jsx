import { useState } from "react";
import {
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { loginUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser(email, password);

      login(data.token);
      setSnackbar({
        open: true,
        message: 'Login successful',
        severity: 'success',
      });

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {

      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error',
      })
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 6,
          p: 4,
        }}
      >
        <Stack
          component="form"
          spacing={3}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4">
            Login
          </Typography>

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            fullWidth
          >
            Login
          </LoadingButton>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              window.location.href = "http://localhost:3000/auth/github";
            }}
          >
            Continue with GitHub
          </Button>
        </Stack>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>

  );
}