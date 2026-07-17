import { createContext, useContext, useEffect, useState } from "react";
import {
  getPositions,
  getPositionById,
  createPosition,
  updatePosition,
  updatePositionAttributes,
  deletePosition,
} from "../services/position.service";

const PositionContext = createContext();

export function PositionProvider({ children }) {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPositions = async () => {
    try {
      const data = await getPositions();
      setPositions(data);
    } catch (error) {
      console.error("Failed to load positions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPositions();
  }, []);

  const addPosition = async (positionData) => {
    const newPosition = await createPosition(positionData);

    setPositions((prev) => [...prev, newPosition]);

    return newPosition;
  };

  const editPosition = async (id, positionData) => {
    const updatedPosition = await updatePosition(id, positionData);

    setPositions((prev) =>
      prev.map((position) =>
        position.id === id ? updatedPosition : position
      )
    );

    return updatedPosition;
  };

  const removePosition = async (id) => {
    await deletePosition(id);

    setPositions((prev) =>
      prev.filter((position) => position.id !== id)
    );
  };

  return (
    <PositionContext.Provider
      value={{
        positions,
        loading,
        loadPositions,
        addPosition,
        editPosition,
        removePosition,
        getPositionById,
        updatePositionAttributes,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePositions() {
  const context = useContext(PositionContext);

  if (!context) {
    throw new Error("usePositions must be used within PositionProvider");
  }

  return context;
}