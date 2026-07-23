import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProfileAttributes,
  createProfileAttribute,
  updateProfileAttribute,
  deleteProfileAttribute,
} from "../services/profileAttributes.service";

const ProfileAttributeContext = createContext();

export function ProfileAttributeProvider({
  children,
}) {
  const [
    profileAttributes,
    setProfileAttributes,
  ] = useState([]);

  const loadProfileAttributes = async () => {
    const data = await getProfileAttributes();
    setProfileAttributes(data);
  };

  useEffect(() => {
    loadProfileAttributes();
  }, []);

  const addProfileAttribute = async (
    newAttribute
  ) => {
    const createdAttribute =
      await createProfileAttribute(newAttribute);

    setProfileAttributes((prev) => [
      ...prev,
      createdAttribute,
    ]);

    return createdAttribute;
  };

  const editProfileAttribute = async (
    id,
    updatedData
  ) => {
    const updatedAttribute =
      await updateProfileAttribute(
        id,
        updatedData
      );

    setProfileAttributes((prev) =>
      prev.map((attribute) =>
        attribute.id === id
          ? updatedAttribute
          : attribute
      )
    );

    return updatedAttribute;
  };

  const removeProfileAttribute = async (
    id
  ) => {
    await deleteProfileAttribute(id);

    setProfileAttributes((prev) =>
      prev.filter(
        (attribute) => attribute.id !== id
      )
    );
  };

  return (
    <ProfileAttributeContext.Provider
      value={{
        profileAttributes,
        loadProfileAttributes,
        addProfileAttribute,
        editProfileAttribute,
        removeProfileAttribute,
      }}
    >
      {children}
    </ProfileAttributeContext.Provider>
  );
}

export const useProfileAttributes = () =>
  useContext(ProfileAttributeContext);