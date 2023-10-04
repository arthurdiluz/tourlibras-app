import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { IJwtPayload } from "../interfaces";

interface AuthContextType {
  user: IJwtPayload | null;
  token: string | null;
  signIn: (jwtToken: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IJwtPayload | null>(null);

  const signIn = async (jwtToken: string) => {
    const decodedUser: IJwtPayload = jwtDecode(jwtToken);

    try {
      await AsyncStorage.setItem("jwtToken", jwtToken);
      await AsyncStorage.setItem("userData", JSON.stringify(decodedUser));
    } catch (error) {
      console.error(error);
    }

    setToken(jwtToken);
    setUser(decodedUser);
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      await AsyncStorage.removeItem("userData");
    } catch (error) {
      console.error(error);
    }

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const userDataJSON = await AsyncStorage.getItem("userData");

      if (userDataJSON) {
        const userData: IJwtPayload = JSON.parse(userDataJSON);
        setUser(userData);
      }
    };

    const loadToken = async () => {
      const storageToken = await AsyncStorage.getItem("jwtToken");
      setToken(storageToken);
    };

    // signOut();

    loadUser();
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
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
