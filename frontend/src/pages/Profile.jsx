import { useEffect, useState } from "react";
import { Alert, CircularProgress, Paper, Stack, Typography, Button, Divider, TextField } from "@mui/material";
import { getProfile, updateProfile } from "../services/profile.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfileAttributes } from "../context/ProfileAttribute";
import { useProjects } from "../context/ProjectContext";
import AddProfileAttributeDialog from "../components/attributes/AddProfileAttribute";
import ProfileAttributeField from "../components/attributes/ProfileAttributeField";
import ProjectCard from '../components/projects/ProjectCard';
import AddProjectDialog from "../components/projects/AddProjectDialog";

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
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { profileAttributes } = useProfileAttributes();
  const { projects, removeProject } = useProjects();

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

        <Typography variant="h5" sx={{ mt: 4 }}>
          Projects and experience
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => {
            setSelectedProject(null);
            setProjectDialogOpen(true);
          }}
        >
          Add project
        </Button>

        <Stack spacing={2}>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={removeProject}
              onEdit={(project) => {
                setSelectedProject(project);
                setProjectDialogOpen(true);
              }}
            />
          ))}
        </Stack>
        <AddProjectDialog
          open={projectDialogOpen}
          project={selectedProject}
          onClose={() => {
            setProjectDialogOpen(false);
            setSelectedProject(null);
          }}
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