"use client";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/lib/providers/auth";
import { ReactNode } from "react";

export const Router = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/404" />;
};
