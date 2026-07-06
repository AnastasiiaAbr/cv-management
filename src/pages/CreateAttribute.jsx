import { useNavigate } from "react-router-dom";

import AttributeForm from "../components/AttributeForm";
import { useAttributes } from "../context/AttributeContext";

export default function CreateAttribute() {
  const navigate = useNavigate();
  const { addAttribute } = useAttributes();

  const handleSubmit = (newAttribute) => {
    addAttribute(newAttribute);
    navigate("/attributes");
  };

  return (
    <AttributeForm
      submitLabel="Create Attribute"
      onSubmit={handleSubmit}
    />
  );
}