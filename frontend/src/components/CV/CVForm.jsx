import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCV } from "../../context/CVContext";

export default function CVForm({ position }) {
  const [title, setTitle] = useState("");
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  const { createNewCV } = useCV();

  const handleChange = (attributeId, value) => {
    setValues((prev) => ({
      ...prev,
      [attributeId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const attributeValues = Object.entries(values).map(
        ([attributeId, value]) => ({
          attributeId: Number(attributeId),
          value,
        })
      );

      await createNewCV({
        title,
        positionId: position.id,
        values: attributeValues,
      });

      navigate(`/positions/${position.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Position"
          value={position.title}
          fullWidth
          disabled
        />

        <Typography variant="h6">
          Attributes
        </Typography>

        {position.attributes.map((attribute) => (
          <TextField
            key={attribute.id}
            label={attribute.name}
            value={values[attribute.id] || ""}
            onChange={(e) =>
              handleChange(attribute.id, e.target.value)
            }
            fullWidth
          />
        ))}

        <Button
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
}