import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ConversationType, UserType } from "../containers/types";
interface DataContextType {
  Users?: UserType[];
  setUsers: Dispatch<SetStateAction<UserType[] | undefined>>;
  Conversations?: ConversationType[];
  setConversations: Dispatch<SetStateAction<ConversationType[] | undefined>>;
}
const DataContext = createContext<DataContextType>({
  setUsers: (value: any) => {},
  setConversations: (value: any) => {},
});
export default DataContext;

interface DataContextProviderType {
  children: ReactNode;
}
export function DataContextProvider({ children }: DataContextProviderType) {
  const [Users, setUsers] = useState<UserType[]>();
  const [Conversations, setConversations] = useState<ConversationType[]>();
  useEffect(() => {
    const mockupUsers = require("../mockup/Users.json");
    const mockupConversation = require("../mockup/conversation.json");
    const localStorageUsers = window.localStorage.getItem("users");
    const localStorageConversations =
      window.localStorage.getItem("conversations");
    if (localStorageUsers) {
      setUsers(JSON.parse(localStorageUsers));
    } else {
      setUsers(mockupUsers);
    }
    if (localStorageConversations) {
      setConversations(JSON.parse(localStorageConversations));
    } else {
      window.localStorage.setItem(
        "conversations",
        JSON.stringify(mockupConversation)
      );
      setConversations(mockupConversation);
    }
  }, []);

  useEffect(() => {
    if (Users) window.localStorage.setItem("users", JSON.stringify(Users));
  }, [Users]);
  useEffect(() => {
    if (Conversations)
      window.localStorage.setItem(
        "conversations",
        JSON.stringify(Conversations)
      );
  }, [Conversations]);
  return (
    <DataContext.Provider
      value={{ Users, setUsers, Conversations, setConversations }}
    >
      {children}
    </DataContext.Provider>
  );
}
