import React, { useContext } from "react";
import { Redirect, Route, Routes } from "react-router-dom";
import { StoreContext } from "../../ContextAPI";
import { ForgotPassword } from "./ForgotPassword";
import { Login } from "./Login";
import { Register } from "./Register";

export const AuthSwitch = () => {
  const { user } = useContext(StoreContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};
