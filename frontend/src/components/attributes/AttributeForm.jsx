import { useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import { getCategories } from "../../services/category.service";

const ATTRIBUTE_TYPES = [
  "STRING",
  "TEXT",
  "IMAGE",
  "NUMERIC",
  "DATE",
  "PERIOD",
  "BOOLEAN",
  "ONE_OF_MANY",
];

export default function AttributeForm({
  initialValues = {
    categoryId: "",
    name: "",
    description: "",
    type: "STRING",
  },
  onSubmit,
  submitLabel,
}) {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(
    initialValues.categoryId || ""
  );
  const [name, setName] = useState(initialValues.name || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [type, setType] = useState(
    initialValues.type || "STRING"
  );

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !categoryId || !type) {
      return;
    }

    await onSubmit({
      categoryId: Number(categoryId),
      name: name.trim(),
      description: description.trim(),
      type,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
      }}
    >
      <Stack
        component="form"
        spacing={3}
        onSubmit={handleSubmit}
      >
        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={(event) =>
            setCategoryId(event.target.value)
          }
          required
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Attribute Name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          select
          label="Attribute Type"
          value={type}
          onChange={(event) =>
            setType(event.target.value)
          }
          required
          fullWidth
        >
          {ATTRIBUTE_TYPES.map((attributeType) => (
            <MenuItem
              key={attributeType}
              value={attributeType}
            >
              {attributeType}
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