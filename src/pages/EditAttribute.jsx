import { useNavigate, useParams } from "react-router-dom";

import AttributeForm from "../components/AttributeForm";
import { usePositions } from "../context/PositionContext";

export default function EditAttribute() {
  const { id, attributeId } = useParams();

  const navigate = useNavigate();

  const {
    getAttributeById,
    updateAttribute,
  } = usePositions();

  const attribute = getAttributeById(id, attributeId);

  if (!attribute) {
    return <div>Attribute not found</div>;
  }

  return (
    <AttributeForm
      initialValues={attribute}
      submitLabel="Save Changes"
      onSubmit={(updatedAttribute) => {
        updateAttribute(id, attributeId, updatedAttribute);

        navigate(`/positions/${id}/attributes`);
      }}
    />
  );
}