import { useState } from "react";
import { Autocomplete, Button, Chip, List, ListItem, Snackbar, Stack, TextField, Typography } from "@mui/material";

import { useAttributes } from "../../context/AttributeContext";

export default function AttributeSelector({
  value,
  onChange,
}) {
  const { attributes } = useAttributes();

  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const selectedAttributes = attributes.filter((attribute) =>
    value.includes(attribute.id)
  );

  const handleAddAttribute = () => {
    if (!selectedAttribute) {
      return;
    }

    if (value.includes(selectedAttribute.id)) {
      setSnackbarOpen(true);
      return;
    }

    onChange([
      ...value,
      selectedAttribute.id,
    ]);

    setSelectedAttribute(null);
  };

  const handleRemoveAttribute = (attributeId) => {
    onChange(
      value.filter((id) => id !== attributeId)
    );
  };

  return (
    <>
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

      <List>
        {selectedAttributes.map((attribute) => (
          <ListItem key={attribute.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
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
                onClick={() =>
                  handleRemoveAttribute(attribute.id)
                }
              >
                Remove
              </Button>
            </Stack>
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="This attribute has already been added."
      />
    </>
  );
}