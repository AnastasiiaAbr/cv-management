import { useEffect, useState } from "react";
import {
Alert,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { getProfile } from "../services/profile.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        if (error.status === 401) {
          logout();
          navigate("/login", { replace: true });
          return;
        }

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate, logout]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

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
      <Stack spacing={2}>
        <Typography variant="h4">
          Profile
        </Typography>

        <Typography>
          ID: {profile.id}
        </Typography>

        <Typography>
          Email: {profile.email}
        </Typography>

        <Button
          variant="outlined"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>
    </Paper>
  );
}