import { useNavigate, useParams } from "react-router-dom";

import AttributeForm from "../../components/attributes/AttributeForm";
import { useAttributes } from "../../context/AttributeContext";

export default function EditAttribute() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getAttributeById,
    updateAttribute,
  } = useAttributes();

  const attribute = getAttributeById(id);

  if (!attribute) {
    return <div>Attribute not found</div>;
  }

  return (
    <AttributeForm
      initialValues={attribute}
      submitLabel="Save Changes"
      onSubmit={(updatedAttribute) => {
        updateAttribute(id, updatedAttribute);
        navigate("/attributes");
      }}
    />
  );
}