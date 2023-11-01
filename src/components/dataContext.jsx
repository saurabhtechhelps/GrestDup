import React, { createContext, useContext, useState } from "react";
// import { useImmer } from "use-immer";

// Create the context
const DataContext = createContext();

// Create a custom hook to access the context
export const useDataContext = () => {
  return useContext(DataContext);
};

// Create the DataProvider component
export const DataProvider = ({ children }) => {
  const [dataModel, setdataModel] = useState({});

  return (
    <DataContext.Provider value={{ dataModel, setdataModel }}>
      {children}
    </DataContext.Provider>
  );
};
