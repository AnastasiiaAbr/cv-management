import { useNavigate } from "react-router-dom";

import AttributeForm from "../../components/attributes/AttributeForm";
import { useAttributes } from "../../context/AttributeContext";

export default function CreateAttribute() {
  const navigate = useNavigate();
  const { addAttribute } = useAttributes();

  const handleSubmit = async (newAttribute) => {
    try {
      await addAttribute(newAttribute);
      navigate("/attributes");
    } catch (error) {
      console.error("Failed to create attribute:", error);
    }
  };

  return (
    <AttributeForm
      submitLabel="Create Attribute"
      onSubmit={handleSubmit}
    />
  );
}