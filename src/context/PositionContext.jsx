import { createContext, useContext, useState } from "react";

const PositionContext = createContext();

const initialPositions = [
  {
    id: 1,
    title: "Meow",
    description: "Professional cat",
    attributes: [
      {
        id: 1,
        name: 'Sleep',
        type: 'select',
      },
      {
        id: 2,
        name: "Purr",
        type: 'select',
      },
      {
        id: 3,
        name: "Catch mice",
        type: 'select'
      }
    ],
  },
  {
    id: 2,
    title: "CattyCat",
    description: "The best cat",
    attributes: [
      {
        id: 1,
        name: 'Jump',
        type: 'select',
      },
      {
        id: 2,
        name: "Play",
        type: 'select',
      },
      {
        id: 3,
        name: "Eat",
        type: 'select'
      }
    ],
  },
  {
    id: 3,
    title: "MeowMeowMeow",
    description: "Very loud cat",
    attributes: [
      {
        id: 1,
        name: 'Meow',
        type: 'select',
      },
      {
        id: 2,
        name: "Run",
        type: 'select',
      },
      {
        id: 3,
        name: "Scratch",
        type: 'select'
      }
    ],
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

  const deletePosition = (id) => {
    setPositions((prevPositions) =>
      prevPositions.filter((position) => position.id !== Number(id)))
  };

return (
  <PositionContext.Provider
    value={{
      positions,
      getPositionById,
      addPosition,
      updatePosition,
      deletePosition,
    }}
  >
    {children}
  </PositionContext.Provider>
);
}

export function usePositions() {
  return useContext(PositionContext);
}