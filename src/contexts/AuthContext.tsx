import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import AuthContextType, { IJwtPayload } from "../interfaces";
import api, { createAxiosAuthInterceptor } from "../utils/api";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IJwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const loadUser = async (): Promise<void> => {
        const userDataJSON = await AsyncStorage.getItem("userData");

        if (!userDataJSON) return;

        setUser(JSON.parse(userDataJSON));
      };

      const loadToken = async (): Promise<void> => {
        const storageToken = await AsyncStorage.getItem("jwtToken");

        if (!storageToken) return;

        handleSetToken(storageToken);
      };

      loadUser();
      loadToken();

      checkTokenExpiration(token);
    } catch (error) {
      return console.error(error);
    } finally {
      return setLoading(false);
    }
  }, []);

  const handleSetToken = (tk: string | null) => {
    if (tk) createAxiosAuthInterceptor(tk);
    setToken(tk);
  };

  const signIn = async (jwtToken: string): Promise<void> => {
    try {
      const decodedUser: IJwtPayload = jwtDecode(jwtToken);

      await Promise.all([
        AsyncStorage.setItem("jwtToken", jwtToken),
        AsyncStorage.setItem("userData", JSON.stringify(decodedUser)),
      ]);

      handleSetToken(jwtToken);
      setUser(decodedUser);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.removeItem("jwtToken").then(() => handleSetToken(null)),
        AsyncStorage.removeItem("userData").then(() => setUser(null)),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const checkTokenExpiration = (token?: string | null) => {
    if (!token) return signOut();

    const decodedToken: IJwtPayload = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    if (expirationTime <= Date.now()) return signOut();
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
