import { createContext, useContext, useState } from "react";
import initialAttributes from "../data/attributes";
const AttributeContext = createContext();

export function AttributeProvider({ children }) {
  const [attributes, setAttributes] = useState(initialAttributes);

  const getAttributeById = (id) => {
    return attributes.find(
      (attribute) => attribute.id === Number(id)
    );
  };

  const addAttribute = (newAttribute) => {
    setAttributes((prevAttributes) => [
      ...prevAttributes,
      {
        id: Date.now(),
        ...newAttribute,
      },
    ]);
  };

  const updateAttribute = (id, updatedAttribute) => {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attribute) =>
        attribute.id === Number(id)
          ? { ...attribute, ...updatedAttribute }
          : attribute
      )
    );
  };

  const deleteAttribute = (id) => {
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