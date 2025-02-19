"use client";
import { createContext, useState } from "react";
// import decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { PartnerObjType, SystemType } from "../config/constant";

export type Payload = {
  iss: string;
  branch: string;
  sub: string;
  type: SystemType;
  role: "guest" | "customer" | "system" | string;
  features?: string[];
  name?: string;
  email?: string;
  picture?: string;
  roles?: string[];
  channel?: string;
  table?: string;
  currency?: string;
  languages?: string[];
  exp: number;
};

export type Position = {
  lat: number;
  lon: number;
};

export const getPayload = (): Payload | null => {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const payload: Payload = jwtDecode(token);
    return payload;
  } catch {
    return null;
  }
};

export const setAccessToken = (token: string) => {
  localStorage?.setItem("token", token);
};

const clientDefault = "u2x4z6C9EbHeKgNkRnTqWtYv2y5A7DaFcHfMhPkSpUrWuZw3z6";

// const getAccessToken = (): string => {
//   return localStorage.getItem("token") ?? clientDefault;
// };
const getAccessToken = (): string => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("token") ?? clientDefault;
  }
  return clientDefault;
};
export const isValidToken = () => {
  const token = getAccessToken();
  if (!token) return false;
  try {
    const { exp }: Payload = jwtDecode(token);
    if (exp * 1000 < new Date().getTime()) return false;
    return true;
  } catch {
    return false;
  }
};

export const getToken = (): string => {
  if (isValidToken()) return getAccessToken();
  return clientDefault;
};

export interface AuthContextType {
  position: Position;
  isAuthenticated: boolean;
  authenticate: (token: string, callback: () => void) => void;
  signout: (cb: () => void) => void;
  setPosition: (value) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(isValidToken);
  const [position, setPosition] = useState({ lat: 0, lon: 0 });

  const authenticate = (token: string, cb: () => void) => {
    window.dispatchEvent(new Event("tokenChanged"));
    setAccessToken(token);
    setAuthenticated(true);
    if (cb) setTimeout(cb, 100);
  };

  const signout = (cb: () => void) => {
    const payload = getPayload();

    const item = PartnerObjType[payload?.type ?? ("" as SystemType)];

    if (!item) {
      localStorage?.removeItem("token");
      setAuthenticated(false);
    }

    cb();
  };

  const defaultContext: AuthContextType = {
    isAuthenticated: isAuthenticated,
    signout: signout,
    position,
    setPosition,
    authenticate,
  };
  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
