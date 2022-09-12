import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserType } from "../containers/types";
import DataContext from "./DataContext";

const UserContext = createContext<UserType>({
  id: 0,
  name: "unknown",
});
export default UserContext;

interface UserContextProviderType {
  children: ReactNode;
}
export function UserContextProvider({ children }: UserContextProviderType) {
  const { Users } = useContext(DataContext);
  const [User, setUser] = useState<UserType>({
    id: 0,
    name: "unknown",
  });
  useEffect(() => {
    const myUser = Users?.find((item) => item.id === 1);
    if (myUser) setUser(myUser);
  }, [Users]);

  return (
    <UserContext.Provider value={User}>
      {User.id !== 0 && children}
    </UserContext.Provider>
  );
}
