import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../services/category.service";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}