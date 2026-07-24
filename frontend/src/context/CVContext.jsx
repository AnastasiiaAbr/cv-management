import { createContext, useContext, useState } from "react";
import * as cvService from "../services/cv.service";

const CVContext = createContext();

export function CVProvider({ children }) {
  const [cvs, setCVs] = useState([]);

  const loadCVs = async () => {
    const data = await cvService.getCVs();
    setCVs(data);
    return data;
  };

  const getCV = async (id) => {
    return await cvService.getCVById(id);
  };

  const getMyCVByPosition = async (positionId) => {
    return await cvService.getMyCVByPosition(positionId);
  };

  const createCV = async (cv) => {
    const createdCV = await cvService.createCV(cv);

    setCVs((prev) => [createdCV, ...prev]);

    return createdCV;
  };

  const updateCV = async (id, cv) => {
    const updatedCV = await cvService.updateCV(id, cv);

    setCVs((prev) =>
      prev.map((item) =>
        item.id === updatedCV.id ? updatedCV : item
      )
    );

    return updatedCV;
  };

  const removeCV = async (id) => {
    await cvService.deleteCV(id);

    setCVs((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <CVContext.Provider
      value={{
        cvs,
        loadCVs,
        getCV,
        getMyCVByPosition,
        createCV,
        updateCV,
        removeCV,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export const useCV = () => useContext(CVContext);