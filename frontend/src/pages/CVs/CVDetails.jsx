import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Divider, Paper, Stack, Typography, Button, } from "@mui/material";

import { useCV } from "../../context/CVContext";

export default function CVDetails() {
  const { id } = useParams();

  const { getCV } = useCV();

  const [cv, setCV] = useState(null);

  useEffect(() => {
    loadCV();
  }, [id]);

  const loadCV = async () => {
    const data = await getCV(id);
    setCV(data);
  };

  if (!cv) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Paper sx={{ p: 4 }}>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >

          <Button
            variant="contained"
            component={Link}
            to={`/cvs/${cv.id}/edit`}
          >
            Edit
          </Button>
        </Stack>

        <Typography color="text.secondary">
          {cv.position.title}
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          Attributes
        </Typography>

        <Stack spacing={2}>
          {cv.attributeValues.map((item) => (
            <Box key={item.id}>
              <Typography fontWeight={600}>
                {item.attribute.name}
              </Typography>

              <Typography color="text.secondary">
                {item.value || "-"}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          Projects
        </Typography>

        {cv.projects.length === 0 ? (
          <Typography color="text.secondary">
            No projects added.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {cv.projects.map(({ project }) => (
              <Box key={project.id}>
                <Typography fontWeight={600}>
                  {project.title}
                </Typography>

                <Typography color="text.secondary">
                  {project.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

      </Paper>
    </>
  );
}