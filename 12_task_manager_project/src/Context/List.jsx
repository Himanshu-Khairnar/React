import { createContext, useContext } from "react";

export const ListContext = createContext({
  todo: [],
  inProgress: [],
  completed: [],
  addTodo: () => {},
  addInProgress: () => {},
  addCompleted: () => {},
});

export const listContextProvider = listContext.Provider;

export const useList = () => {
  return useContext(listContext);
};
