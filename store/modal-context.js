import React, { useContext, useState } from "react";

export const GeneralModalContext = React.createContext(null);

export function GeneralModalContextProvider({ children }) {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <GeneralModalContext.Provider
      value={{
        isModalOpened,
        setIsModalOpened,
      }}
    >
      {children}
    </GeneralModalContext.Provider>
  );
}

export function useGeneralletterModalContext() {
  const context = useContext(GeneralModalContext);
  if (!context) {
    throw new Error(
      "useGeneralletterModalContext can only be used inside GeneralModalContext"
    );
  }
  return context;
}
