import { useState } from "react";
import {
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import AttributeSelector from "./attributes/AttributeSelector";

export default function PositionForm({
  initialValues,
  onSubmit,
  submitLabel,
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [attributeIds, setAttributeIds] = useState(
    initialValues.attributeIds ?? []
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    onSubmit({
      title,
      description,
      attributeIds,
    });
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

        <AttributeSelector
          value={attributeIds}
          onChange={setAttributeIds}
        />

        <Button
          type="submit"
          variant="contained"
        >
          {submitLabel}
        </Button>
      </Stack>
    </Paper>
  );
}