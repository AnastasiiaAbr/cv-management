import { useEffect, useState } from "react";
import { Alert, CircularProgress, Paper, Stack, Typography, Button, Divider, TextField } from "@mui/material";
import { getProfile, updateProfile } from "../services/profile.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfileAttributes } from "../context/ProfileAttribute";
import AddProfileAttributeDialog from "../components/attributes/AddProfileAttribute";
import ProfileAttributeField from "../components/attributes/ProfileAttributeField";


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
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { profileAttributes } = useProfileAttributes();

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

        <Typography variant="h5">
          Me
        </Typography>

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ alignSelf: "flex-end" }}
        >
          Save
        </Button>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Info
        </Typography>

        {profileAttributes.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Add your personal information
          </Typography>
        ) : (
          <Stack spacing={2}>
            {profileAttributes.map((profileAttribute) => (
              <ProfileAttributeField
                key={profileAttribute.id}
                profileAttribute={profileAttribute}
              />
            ))}
          </Stack>
        )}

        <Button
          variant="outlined"
          onClick={() => setDialogOpen(true)}
        >
          Add attribute
        </Button>
        <AddProfileAttributeDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
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