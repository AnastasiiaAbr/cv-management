import { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { useAttributes } from "../../context/AttributeContext";
import { useProfileAttributes } from "../../context/ProfileAttribute";

export default function AddProfileAttributeDialog({
  open,
  onClose,
}) {
  const { attributes } = useAttributes();

  const {
    profileAttributes,
    addProfileAttribute,
  } = useProfileAttributes();

  const [selectedAttributeId, setSelectedAttributeId] = useState("");

  const availableAttributes = useMemo(() => {
    return attributes.filter(
      (attribute) =>
        !profileAttributes.some(
          (profileAttribute) =>
            profileAttribute.attribute.id === attribute.id
        )
    );
  }, [attributes, profileAttributes]);

  const handleClose = () => {
    setSelectedAttributeId("");
    onClose();
  };

  const handleAdd = async () => {
    if (!selectedAttributeId) return;

    try {
      await addProfileAttribute({
        attributeId: Number(selectedAttributeId),
        value: "",
      });

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Add attribute
      </DialogTitle>

      <DialogContent>
        <TextField
          select
          fullWidth
          label="Attribute"
          value={selectedAttributeId}
          onChange={(e) => setSelectedAttributeId(e.target.value)}
          margin="normal"
        >
          {availableAttributes.length === 0 ? (
            <MenuItem disabled>
              No available attributes
            </MenuItem>
          ) : (
            availableAttributes.map((attribute) => (
              <MenuItem
                key={attribute.id}
                value={attribute.id}
              >
                {attribute.name}
              </MenuItem>
            ))
          )}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!selectedAttributeId}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}