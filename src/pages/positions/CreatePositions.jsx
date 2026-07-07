import { useNavigate } from "react-router-dom";
import { usePositions } from "../../context/PositionContext";
import { Stack, Typography, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import PositionForm from "../../components/PositionForm";

export default function CreatePosition() {
  const navigate = useNavigate();
  const { addPosition } = usePositions();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    addPosition({
      title, description
    });

    navigate('/positions');
  };

  return (
    <Paper elevation={1} sx={{ p: 4 }}>
      <Typography variant='h4' gutterBottom>
        Create Position
      </Typography>

      <PositionForm 
      initialValues={{
        title: '',
        description: '',
      }}
      submitLabel='Create Position'
      onSubmit={(position) => {
        addPosition(position);
        navigate('/positions')
      }}
      />
    </Paper>
  )
}