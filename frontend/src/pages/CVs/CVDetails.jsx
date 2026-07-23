import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

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
      <Typography variant="h4" sx={{ mb: 3 }}>
        {cv.title}
      </Typography>

      <Paper sx={{ p: 4 }}>

        <Typography variant="h6">
          Position
        </Typography>

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

      </Paper>
    </>
  );
}