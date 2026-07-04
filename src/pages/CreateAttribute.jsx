import { useNavigate, useParams } from "react-router-dom";

import AttributeForm from "../components/AttributeForm";
import { usePositions } from "../context/PositionContext";

export default function CreateAttribute() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addAttribute } = usePositions();

  return (
    <AttributeForm
      initialValues={{
        name: "",
        type: "text",
      }}
      submitLabel="Create Attribute"
      onSubmit={(attribute) => {
        addAttribute(id, attribute);

        navigate(`/positions/${id}/attributes`);
      }}
    />
  );
}