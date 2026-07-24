import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useCV } from "../../context/CVContext";
import CVForm from "../../components/CV/CVForm";

export default function EditCV() {
  const { id } = useParams();
  const { getCV } = useCV();

  const [cv, setCV] = useState(null);

  useEffect(() => {
    loadCV();
  }, [id]);

  const loadCV = async () => {
    try {
      const data = await getCV(id);
      setCV(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!cv) {
    return <Typography>Loading...</Typography>;
  }

  const initialValues = Object.fromEntries(
    cv.attributeValues.map((item) => [
      item.attributeId,
      item.value ?? "",
    ])
  );

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit CV
      </Typography>

      <Paper sx={{ p: 4 }}>
        <CVForm
          position={cv.position}
          initialValues={initialValues}
          cvId={cv.id}
        />
      </Paper>
    </>
  );
}