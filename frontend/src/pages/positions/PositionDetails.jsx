import { useEffect, useState } from "react";
import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CVList from "../../components/CV/CVList";
import { getMyCVByPosition } from "../../services/cv.service";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import ManageAttributes from "../../components/attributes/ManageAttributes";
import { usePositions } from "../../context/PositionContext";

export default function PositionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    getPositionById,
    updatePositionAttributes,
    removePosition,
  } = usePositions();

  const [position, setPosition] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [myCV, setMyCV] = useState(null);

  const loadPosition = async () => {
    try {
      const data = await getPositionById(id);
      setPosition(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMyCV = async () => {
    try {
      const cv = await getMyCVByPosition(id);
      setMyCV(cv);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPosition();

    if (user?.role === "CANDIDATE") {
      loadMyCV();
    }
  }, [id]);

  const canManagePosition =
    user?.role === "ADMIN" || user?.role === "RECRUITER";

  const canCreateCV = user?.role === "CANDIDATE";

  const handleSaveAttributes = async (attributeIds) => {
    try {
      await updatePositionAttributes(position.id, attributeIds);

      const updatedPosition = await getPositionById(position.id);
      setPosition(updatedPosition);

      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    await removePosition(Number(id));
    navigate("/positions");
  };

  if (!position) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Position Details
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mb={3}
        >
          <Typography variant="h5" sx={{ mr: 4 }}>
            {position.title}
          </Typography>

          {canManagePosition && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                component={Link}
                to={`/positions/${id}/edit`}
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpen(true)}
              >
                Delete
              </Button>
            </Stack>
          )}
        </Stack>
        <Divider />

        <Box sx={{ py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>

          <Typography color="text.secondary">
            {position.description || "No description"}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Attributes
          </Typography>

          {position.attributes.length === 0 ? (
            <Typography color="text.secondary">
              No attributes assigned.
            </Typography>
          ) : (
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: 2 }}
            >
              {position.attributes.map((attribute) => (
                <Chip
                  key={attribute.id}
                  label={attribute.name}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          )}

          {canManagePosition && (
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              onClick={() => setDialogOpen(true)}
            >
              Manage Attributes
            </Button>
          )}
        </Box>

        <Divider />

        <Box sx={{ py: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" sx={{ mr: 2 }}>
              CVs
            </Typography>

            {canCreateCV && (
              !myCV && (
              
                <Button
                  variant="contained"
                  component={Link}
                  to={`/positions/${position.id}/cv/new`}
                >
                  Create CV
                </Button>
              )
            )}
          </Stack>

          <CVList
            cvs={
              user?.role === "CANDIDATE"
                ? myCV
                  ? [myCV]
                  : []
                : position.cvs
            }
          />
        </Box>

        <Divider />

        <Box sx={{ py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Discussion
          </Typography>

          <Typography color="text.secondary">
            Discussion will be implemented later.
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ pt: 4 }}>
          <Button
            variant="outlined"
            component={Link}
            to="/positions"
          >
            Back to Positions
          </Button>
        </Box>
      </Paper>
    </>
  );
}