import { useNavigate, useParams } from "react-router-dom";

import PositionForm from "../../components/PositionForm";
import { usePositions } from "../../context/PositionContext";

export default function EditPosition() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getPositionById, updatePosition } = usePositions();

  const position = getPositionById(id);

  if (!position) {
    return <div>Position not found</div>;
  }

  return (
    <PositionForm
      initialValues={position}
      submitLabel="Save Changes"
      onSubmit={(updatedPosition) => {
        updatePosition(id, updatedPosition);
        navigate(`/positions/${id}`);
      }}
    />
  );
}