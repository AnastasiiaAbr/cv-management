import { Paper, Typography, List, ListItem, ListItemText, Button, Divider, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { usePositions } from "../context/PositionContext";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";


export default function PositionDetails() {
  const { id } = useParams();
  const { getPositionById, deletePosition } = usePositions();
  const position = getPositionById(id);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!position) {
    return (
      <Typography variant="h4">
        Position not found
      </Typography>
    );
  };

  const handleDelete = () => {
    deletePosition(id);
    navigate('/positions');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h4">
            {position.title}
          </Typography>

          <Divider />

          <div>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>

            <Typography color="text.secondary">
              {position.description}
            </Typography>
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Attributes
            </Typography>

            <List>
              {position.attributes.map((attribute) => (
                <ListItem key={attribute}>

                  <ListItemText primary={attribute} />
                </ListItem>
              ))}
            </List>
          </div>

          <Stack direction='row' spacing={2}>
            <Button
              variant="contained"
              component={Link}
              to={`/positions/${id}/edit`}
              startIcon={<EditIcon />}>
              Edit
            </Button>

            <Button
              color='error'
              variant="contained"
              onClick={handleOpen}>
              Delete
            </Button>

            <Button
              variant='outlined'
              component={Link}
              to="/positions"
              sx={{ alignSelf: "flex-start" }}
            >
              Back to Positions
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Dialog open={open}
        onclse={handleClose}>
        <DialogTitle>
          Delete Position
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this position? Yhis action cannot be undone
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            color='error'
            variant='contained'
            onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}