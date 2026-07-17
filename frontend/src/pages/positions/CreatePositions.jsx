import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PositionForm from "../../components/PositionForm";
import { usePositions } from "../../context/PositionContext";

export default function CreatePosition() {
  const navigate = useNavigate();
  const { addPosition } = usePositions();

  return (
    <Paper elevation={1} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Position
      </Typography>

      <PositionForm
        initialValues={{
          title: "",
          description: "",
        }}
        submitLabel="Create Position"
        onSubmit={async (position) => {
          await addPosition(position);
          navigate("/positions");
        }}
      />
    </Paper>
  );
}