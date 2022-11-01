import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../../App";
import Login from "./../login/Login";
import Profil from "./../profil/Profil";
export default function Navigation() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="*" element={<App />} />
    </Routes>
  );
}
