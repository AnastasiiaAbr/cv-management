import { Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <div>
                <Typography variant="h6">
                  {project.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {formatDate(project.startDate)}
                  {" — "}
                  {project.current
                    ? "Present"
                    : formatDate(project.endDate)}
                </Typography>
              </div>

              <Stack direction="row">
                <IconButton onClick={() => onEdit?.(project)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => setDeleteOpen(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>

            {project.description && (
              <Typography>
                {project.description}
              </Typography>
            )}

            {project.technologies?.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {project.technologies.map((item) => (
                  <Chip
                    key={item.technology.id}
                    label={item.technology.name}
                    size="small"
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete project?"
        message={`Delete "${project.name}"?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          onDelete?.(project.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}