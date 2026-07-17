import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import PositionForm from "../../components/PositionForm";
import { usePositions } from "../../context/PositionContext";

export default function EditPosition() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getPositionById,
    editPosition,
  } = usePositions();

  const [position, setPosition] = useState(null);

  useEffect(() => {
    loadPosition();
  }, [id]);

  const loadPosition = async () => {
    try {
      const data = await getPositionById(id);
      setPosition(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!position) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <PositionForm
      initialValues={{
        title: position.title,
        description: position.description,
        attributeIds: position.attributes.map((attribute) => attribute.id),
      }}
      submitLabel="Save Changes"
      onSubmit={async (updatedPosition) => {
        await editPosition(id, updatedPosition);
        navigate(`/positions/${id}`);
      }}
    />
  );
}