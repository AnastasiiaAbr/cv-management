import { useEffect, useState } from "react";
import { Alert, CircularProgress, Paper, Stack, Typography, Button, Divider, TextField } from "@mui/material";
import { getProfile, updateProfile } from "../services/profile.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    headline: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    summary: '',
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          headline: data.headline ?? "",
          location: data.location ?? "",
          linkedin: data.linkedin ?? "",
          github: data.github ?? "",
          website: data.website ?? "",
          summary: data.summary ?? "",
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess('');
  };

  const handleSubmit = async () => {
    try {
      const updatedProfile = await updateProfile(formData);

      setFormData({
        firstName: updatedProfile.firstName ?? "",
        lastName: updatedProfile.lastName ?? "",
        email: updatedProfile.email ?? "",
        phone: updatedProfile.phone ?? "",
        headline: updatedProfile.headline ?? "",
        location: updatedProfile.location ?? "",
        linkedin: updatedProfile.linkedin ?? "",
        github: updatedProfile.github ?? "",
        website: updatedProfile.website ?? "",
        summary: updatedProfile.summary ?? "",
      });

      setError("");

      setSuccess("Profile updated successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 6,
        p: 4,
      }}
    >

      {success && (
        <Alert severity="success">
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Stack spacing={3}>
        <Typography variant="h4">
          Profile
        </Typography>

        <Typography variant="h6">
          Personal Information
        </Typography>

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />

        <Divider />

        <Typography variant="h6">
          Professional
        </Typography>

        <TextField
          label="Headline"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          multiline
          rows={5}
          fullWidth
        />

        <Divider />

        <Typography variant="h6">
          Location
        </Typography>

        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />

        <Divider />

        <Typography variant="h6">
          Links
        </Typography>

        <TextField
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="GitHub"
          name="github"
          value={formData.github}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          fullWidth
        />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Button
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}