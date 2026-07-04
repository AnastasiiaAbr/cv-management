import { useParams } from "react-router-dom";
import { usePositions } from "../context/PositionContext";
import { Box, Button, Chip, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from "react-router-dom";

export default function PositionAttributes() {
  const { id } = useParams();
  const { getPositionById } = usePositions();

  const position = getPositionById(id);

  if (!position) {
    return (
      <Typography variant='h4'>
        Position not found
      </Typography>
    )
  }

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4">
          {position.title} Attributes
        </Typography>

        <List>
          {position.attributes.map((attribute) => (
            <ListItem key={attribute.id}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>
                  {attribute.name}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    label={attribute.type}
                    variant="outlined"
                  />

                  <Button
                    size="small"
                    component={Link}
                    to={`/positions/${id}/attributes/${attribute.id}/edit`}
                  >
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </ListItem>
          ))}
        </List>

        <Box display='flex' gap={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to={`/positions/${id}/attributes/new`}>
            Add Attribute
          </Button>

          <Button
            variant="outlined"
            component={Link}
            to={`/positions/${id}`}
            startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}