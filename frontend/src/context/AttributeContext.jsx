import { createContext, useContext, useState, useEffect } from "react";
const AttributeContext = createContext();
import { getAttributes, createAttribute, updateAttribute as updateAttributeRequest, deleteAttribute as deleteAttributeRequest } from "../services/attribute.service";
import { useAuth } from "./AuthContext";

export function AttributeProvider({ children }) {
  const [attributes, setAttributes] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setAttributes([]);
      return;
    }

    const loadAttributes = async () => {
      try {
        const data = await getAttributes();
        setAttributes(data);
      } catch (error) {
        console.error("Failed to load attributes:", error);
      }
    };

    loadAttributes();
  }, [isAuthenticated]);

  const getAttributeById = (id) => {
    return attributes.find(
      (attribute) => attribute.id === Number(id)
    );
  };

  const addAttribute = async (newAttribute) => {
    const createdAttribute = await createAttribute(newAttribute);

    setAttributes((prevAttributes) => [
      ...prevAttributes,
      createdAttribute,
    ]);

    return createdAttribute;
  };

  const updateAttribute = async (id, updatedAttribute) => {
    const attribute = await updateAttributeRequest(
      id,
      updatedAttribute
    );

    setAttributes((prevAttributes) =>
      prevAttributes.map((item) =>
        item.id === Number(id)
          ? attribute
          : item
      )
    );

    return attribute;
  };

  const deleteAttribute = async (id) => {
    await deleteAttributeRequest(id);

    setAttributes((prevAttributes) =>
      prevAttributes.filter(
        (attribute) => attribute.id !== Number(id)
      )
    );
  };

  const findAttributesByName = (query) => {
    return attributes.filter((attribute) =>
      attribute.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <AttributeContext.Provider
      value={{
        attributes,
        getAttributeById,
        addAttribute,
        updateAttribute,
        deleteAttribute,
        findAttributesByName,
      }}
    >
      {children}
    </AttributeContext.Provider>
  );
}

export function useAttributes() {
  return useContext(AttributeContext);
}