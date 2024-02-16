import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import AuthContextType, { IJwtPayload } from "../interfaces";
import api, { createAxiosAuthInterceptor } from "../utils/api";
import { Alert } from "react-native";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";
import { getErrorMessage } from "../utils/error";

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
        const userDataJSON = await getItemAsync("userData", {
          requireAuthentication: false,
        });

        if (!userDataJSON) return;

        setUser(JSON.parse(userDataJSON));
      };

      const loadToken = async (): Promise<void> => {
        const storageToken = await getItemAsync("jwtToken", {
          requireAuthentication: false,
        });

        if (!storageToken) return;

        handleSetToken(storageToken);
      };

      loadUser();
      loadToken();
      checkTokenExpiration(token);
    } catch (error) {
      return Alert.alert("Erro ao carregar token", getErrorMessage(error));
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
        setItemAsync("jwtToken", jwtToken, { requireAuthentication: false }),
        setItemAsync("userData", JSON.stringify(decodedUser), {
          requireAuthentication: false,
        }),
      ]);

      handleSetToken(jwtToken);
      setUser(decodedUser);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      return Alert.alert("Erro ao armazenar token", getErrorMessage(error));
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await Promise.all([
        deleteItemAsync("jwtToken").then(() => handleSetToken(null)),
        deleteItemAsync("userData").then(() => setUser(null)),
      ]);
    } catch (error) {
      return Alert.alert("Erro ao apagar tokens", getErrorMessage(error));
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

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
