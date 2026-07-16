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

  const initialValues = {
    categoryId: attribute.category.id,
    name: attribute.name,
    description: attribute.description,
    type: attribute.type,
  };

  const handleSubmit = async (updatedAttribute) => {
    try {
      await updateAttribute(id, updatedAttribute);
      navigate("/attributes");
    } catch (error) {
      console.error("Failed to update attribute:", error);
    }
  };

  return (
    <AttributeForm
      initialValues={initialValues}
      submitLabel="Save Changes"
      onSubmit={handleSubmit}
    />
  );
}