import { useState } from "react";
import { Box, Checkbox, FormControlLabel, MenuItem, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import ConfirmDialog from "../common/ConfirmDialog";

import { useProfileAttributes } from "../../context/ProfileAttribute";

export default function ProfileAttributeField({
  profileAttribute,
}) {
  const [value, setValue] = useState(
    profileAttribute.value ?? ""
  );

  const { editProfileAttribute, removeProfileAttribute } = useProfileAttributes();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSave = async (newValue) => {
    try {
      await editProfileAttribute(profileAttribute.id, {
        value: newValue,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderField = () => {
    switch (profileAttribute.attribute.type) {
      case "TEXT":
        return (
          <TextField
            multiline
            rows={4}
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => handleSave(value)}
          />
        );

      case "NUMERIC":
        return (
          <TextField
            type="number"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => handleSave(value)}
          />
        );

      case "DATE":
        return (
          <TextField
            type="date"
            fullWidth
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              handleSave(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );

      case "BOOLEAN":
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={value === "true"}
                onChange={(e) => {
                  const newValue = String(e.target.checked);
                  setValue(newValue);
                  handleSave(newValue);
                }}
              />
            }
            label="Yes"
          />
        );

      case "ONE_OF_MANY":
        return (
          <TextField
            select
            fullWidth
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              handleSave(e.target.value);
            }}
          >
            {(profileAttribute.attribute.options ?? []).map(
              (option) => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              )
            )}
          </TextField>
        );

      case "IMAGE":
        return (
          <TextField
            fullWidth
            placeholder="Image URL"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => handleSave(value)}
          />
        );

      case "PERIOD":
        return (
          <TextField
            fullWidth
            placeholder="e.g. Jan 2024 - Present"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => handleSave(value)}
          />
        );

      case "STRING":
      default:
        return (
          <TextField
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => handleSave(value)}
          />
        );
    }
  };

  return (
    <>
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle2">
            {profileAttribute.attribute.name}
          </Typography>

          <IconButton
            color="error"
            size="small"
            onClick={() => setDeleteOpen(true)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        {renderField()}
      </Box>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete attribute?"
        message={`Delete "${profileAttribute.attribute.name}" from your profile?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeProfileAttribute(profileAttribute.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}