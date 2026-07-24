import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCV } from "../../context/CVContext";

export default function CVForm({
  position,
  initialValues = {},
  cvId,
}) {
  const navigate = useNavigate();

  const { createCV, updateCV } = useCV();

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

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

      const payload = {
        positionId: position.id,
        values: attributeValues,
      };

      if (cvId) {
        await updateCV(cvId, payload);
        navigate(`/cvs/${cvId}`);
      } else {
        const cv = await createCV(payload);
        navigate(`/cvs/${cv.id}`);
      }
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
          {cvId ? "Update CV" : "Create CV"}
        </Button>
      </Stack>
    </Box>
  );
}