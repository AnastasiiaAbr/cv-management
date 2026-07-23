import { Stack, Typography } from "@mui/material";
import CVCard from "./CVCard";

export default function CVList({ cvs = [] }) {
  if (cvs.length === 0) {
    return (
      <Typography color="text.secondary">
        No CVs created yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {cvs.map((cv) => (
        <CVCard
          key={cv.id}
          cv={cv}
        />
      ))}
    </Stack>
  );
}