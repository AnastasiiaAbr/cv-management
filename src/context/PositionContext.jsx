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
  }

  const addAttribute = (positionId, newAttribute) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) => {
        if (position.id !== Number(positionId)) {
          return position;
        }

        return {
          ...position,
          attributes: [
            ...position.attributes,
            {
              id: Date.now(),
              ...newAttribute,
            },
          ],
        };
      })
    );
  };

  const updateAttribute = (positionId, attributeId, updatedAttribute) => {
  setPositions((prevPositions) =>
    prevPositions.map((position) => {
      if (position.id !== Number(positionId)) {
        return position;
      }

      return {
        ...position,
        attributes: position.attributes.map((attribute) =>
          attribute.id === Number(attributeId)
            ? { ...attribute, ...updatedAttribute }
            : attribute
        ),
      };
    })
  );
};

const getAttributeById = (positionId, attributeId) => {
  const position = getPositionById(positionId);

  if (!position) {
    return null;
  }

  return position.attributes.find(
    (attribute) => attribute.id === Number(attributeId)
  );
};

  return (
    <PositionContext.Provider
      value={{
        positions,
        getPositionById,
        addPosition,
        updatePosition,
        deletePosition,
        addAttribute,
        updateAttribute,
        getAttributeById,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePositions() {
  return useContext(PositionContext);
}