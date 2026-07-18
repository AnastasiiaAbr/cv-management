import { useEffect, useState } from "react";
import { Box, Button, Chip, Divider, Paper, Stack, Tab, Tabs, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import ManageAttributes from "../../components/attributes/ManageAttributes";
import { usePositions } from "../../context/PositionContext";

export default function PositionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getPositionById,
    updatePositionAttributes,
    removePosition,
  } = usePositions();

  const [position, setPosition] = useState(null);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadPosition();
  }, [id]);

  const loadPosition = async () => {
    try {
      const data = await getPositionById(id);
      setPosition(data);
    } catch (error) {
      console.error(error);
    }
  };

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
      <Paper sx={{ p: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">
            {position.title}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              component={Link}
              to={`/positions/${id}/edit`}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          sx={{ mb: 3 }}
        >
          <Tab label="General" />
          <Tab label="Attributes" />
          <Tab label="Discussion" />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>

            <Typography color="text.secondary">
              {position.description || "No description"}
            </Typography>
          </Box>
        )}

        {tab === 1 && (
          <Box>
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

            <Button
              sx={{ mt: 3 }}
              variant="contained"
              onClick={() => setDialogOpen(true)}
            >
              Manage Attributes
            </Button>
          </Box>
        )}

        {tab === 2 && (
          <Typography color="text.secondary">
            Discussion will be implemented later.
          </Typography>
        )}

        <Box mt={4}>
          <Button
            variant="outlined"
            component={Link}
            to="/positions"
          >
            Back to Positions
          </Button>
        </Box>
      </Paper>

      <ConfirmDialog
        open={open}
        title="Delete Position"
        message="Are you sure you want to delete this position?"
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />

      <ManageAttributes
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        position={position}
        onSave={handleSaveAttributes}
      />
    </>
  );
}