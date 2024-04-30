import { createContext } from "react";

interface AuthContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});
