import { Paper, Typography, List, ListItem, ListItemText, Button, Divider, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { usePositions } from "../context/PositionContext";
import EditIcon from '@mui/icons-material/Edit';


export default function PositionDetails() {
  const { id } = useParams();
  const { getPositionById } = usePositions();
  const position = getPositionById(id);

  if (!position) {
    return (
      <Typography variant="h4">
        Position not found
      </Typography>
    );
  }

  return (
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
  );
}