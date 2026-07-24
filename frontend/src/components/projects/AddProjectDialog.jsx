import { useState, useEffect } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, TextField } from "@mui/material";
import { useProjects } from "../../context/ProjectContext";

export default function AddProjectDialog({ open, onClose, project }) {
  const { addProject, editProject } = useProjects();

  const emptyForm = {
    name: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;

    if (project) {
      setFormData({
        name: project.name,
        startDate: project.startDate?.slice(0, 10) ?? "",
        endDate: project.endDate?.slice(0, 10) ?? "",
        current: project.current,
        description: project.description ?? "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [open, project]);
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => {
      if (name === "current") {
        return {
          ...prev,
          current: checked,
          endDate: checked ? "" : prev.endDate,
        };
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async () => {
    if (project) {
      await editProject(project.id, formData);
    } else {
      await addProject(formData);
    }

    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {project ? "Edit project" : "Add project"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Project name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            label="Start date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            label="End date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            disabled={formData.current}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.current}
                name="current"
                onChange={handleChange}
              />
            }
            label="Current project"
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            minRows={4}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.name || !formData.startDate}
        >
          {project ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}