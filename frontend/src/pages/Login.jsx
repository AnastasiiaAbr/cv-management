import { useState } from "react";
import {
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
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

        <Button
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </Stack>
    </Paper>
  );
}