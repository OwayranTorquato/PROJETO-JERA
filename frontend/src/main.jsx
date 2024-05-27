import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Login from "./pages/Login";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Profile from "./pages/profiles"

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Profile />} />} />
          <Route path="movie/:id" element={<PrivateRoute element={<Movie />} />} />
          <Route path="search" element={<PrivateRoute element={<Search />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
