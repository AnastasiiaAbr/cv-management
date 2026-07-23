import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { usePositions } from "../../context/PositionContext";
import CVForm from "../../components/CV/CVForm";

export default function CreateCV() {
  const { id: positionId } = useParams();
  const { getPositionById } = usePositions();

  const [position, setPosition] = useState(null);

  useEffect(() => {
    loadPosition();
  }, [positionId]);

  const loadPosition = async () => {
    try {
      const data = await getPositionById(positionId);
      setPosition(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!position) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Create CV
      </Typography>

      <Paper sx={{ p: 4 }}>
        <CVForm position={position} />
      </Paper>
    </>
  );
}