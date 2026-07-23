import { createContext, useContext } from "react";
import * as cvService from "../services/cv.service";

const CVContext = createContext();

export function CVProvider({ children }) {
  const createNewCV = async (cv) => {
    return await cvService.createCV(cv);
  };

  const getCV = async (id) => {
    return await cvService.getCVById(id);
  };

  return (
    <CVContext.Provider
      value={{
        createNewCV,
        getCV,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export const useCV = () => useContext(CVContext);