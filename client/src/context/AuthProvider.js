import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setAuth({ isAuthenticated: true, user });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useUserData = () => {
  const { userData, setUserData } = useContext(AuthContext);
  return { userData, setUserData };
};
