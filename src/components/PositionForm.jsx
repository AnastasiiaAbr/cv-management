import { useState } from "react";
import {
  Snackbar,
  List,
  ListItem,
  Typography,
  Button,
  Paper,
  Stack,
  TextField, Autocomplete, Chip
} from "@mui/material";
import { useAttributes } from "../context/AttributeContext";

export default function PositionForm({
  initialValues,
  onSubmit,
  submitLabel,
}) {
  const { attributes } = useAttributes();

  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedAttributeIds, setSelectedAttributeIds] = useState(initialValues.attributeIds ?? []);
  const [snackbarOpen, setSnackbarOpen] = useState(null);

  const selectedAttributes = attributes.filter((attribute) =>
    selectedAttributeIds.includes(attribute.id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    onSubmit({
      title,
      description,
      attributeIds: selectedAttributeIds,
    });
  };

  const handleAddAttribute = () => {
    if (!selectedAttribute) {
      return;
    };

    if (selectedAttributeIds.includes(selectedAttribute.id)) {
      setSnackbarOpen(true);
      return;
    };

    setSelectedAttributeIds((prev) => [
      ...prev,
      selectedAttribute.id,
    ]);

    setSelectedAttribute(null);
  };

  const handleRemoveAttribute = (attributeId) => {
    setSelectedAttributeIds((prev) =>
      prev.filter((id) => id !== attributeId)
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Stack
        component="form"
        spacing={3}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          multiline
          fullWidth
          required
        />

        <Autocomplete
          options={attributes}
          value={selectedAttribute}
          onChange={(_, value) => setSelectedAttribute(value)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Attribute"
            />
          )}
        />

        <Button
          variant="contained"
          onClick={handleAddAttribute}
          disabled={!selectedAttribute}
        >
          Add Attribute
        </Button>

        <Button
          type="submit"
          variant="contained"
        >
          {submitLabel}
        </Button>

        <List>
          {selectedAttributes.map((attribute) => (
            <ListItem key={attribute.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography>
                    {attribute.name}
                  </Typography>

                  <Chip
                    label={attribute.type}
                    size="small"
                    variant="outlined"
                  />
                </Stack>

                <Button
                  size="small"
                  color="error"
                  onClick={() => handleRemoveAttribute(attribute.id)}
                >
                  Remove
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="This attribute has already been added."
      />
    </Paper>
  );
}