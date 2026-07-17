import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
} from "@mui/material";

import { useAttributes } from "../../context/AttributeContext";

export default function ManageAttributes({
  open,
  onClose,
  position,
  onSave,
}) {
  const { attributes } = useAttributes();

  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (position) {
      setSelectedIds(position.attributes.map((a) => a.id));
    }
  }, [position]);

  const toggleAttribute = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Manage Attributes
      </DialogTitle>

      <DialogContent dividers>
        <Stack>
          {attributes.map((attribute) => (
            <FormControlLabel
              key={attribute.id}
              control={
                <Checkbox
                  checked={selectedIds.includes(attribute.id)}
                  onChange={() => toggleAttribute(attribute.id)}
                />
              }
              label={attribute.name}
            />
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => onSave(selectedIds)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}