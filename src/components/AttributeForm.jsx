import { useState } from "react";

import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

const ATTRIBUTE_TYPES = [
  "text",
  "number",
  "select",
  "date",
];

export default function AttributeForm({
  initialValues,
  onSubmit,
  submitLabel,
}) {
  const [name, setName] = useState(initialValues.name);
  const [type, setType] = useState(initialValues.type);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    onSubmit({
      name,
      type,
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
          label="Attribute Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        <TextField
          select
          label="Attribute Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
        >
          {ATTRIBUTE_TYPES.map((type) => (
            <MenuItem
              key={type}
              value={type}
            >
              {type}
            </MenuItem>
          ))}
        </TextField>

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