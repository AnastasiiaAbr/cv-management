import { createContext, useContext, useState } from "react";

const PositionContext = createContext();

const initialPositions = [
  {
    id: 1,
    title: "Meow",
    description: "Professional cat",
    attributes: ["Sleep", "Purr", "Catch mice"],
  },
  {
    id: 2,
    title: "CattyCat",
    description: "The best cat",
    attributes: ["Jump", "Play", "Eat"],
  },
  {
    id: 3,
    title: "MeowMeowMeow",
    description: "Very loud cat",
    attributes: ["Meow", "Run", "Scratch"],
  },
];

export function PositionProvider({ children }) {
  const [positions, setPositions] = useState(initialPositions);

  const addPosition = (newPosition) => {
    setPositions((prevPositions) => [
      ...prevPositions, 
      {
        id: Date.now(),
        attributes: [],
        ...newPosition, 
      }
    ])
  }
  const getPositionById = (id) => {
    return positions.find((position) => position.id === Number(id));
  };

const updatePosition = (id, updatedPosition) => {
  setPositions((prevPositions) =>
    prevPositions.map((position) =>
      position.id === Number(id)
        ? { ...position, ...updatedPosition }
        : position
    )
  );
};

  return (
    <PositionContext.Provider
      value={{
        positions,
        getPositionById,
        addPosition,
        updatePosition,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePositions() {
  return useContext(PositionContext);
}