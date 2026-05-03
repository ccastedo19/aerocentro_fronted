import React from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "../components/layout/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Usuarios } from "../pages/Usuarios";
import { Login } from "../pages/Login";

export const Rutas = () => {
  return (
    <Routes>
      {/* Login sin Layout */}
      <Route path="/login" element={<Login />} />

      {/* Rutas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="usuarios" element={<Usuarios />} />
      </Route>
    </Routes>
  );
};