import logo from "./Pages/logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Picture from "./components/Apod";
import Mars from "./components/Mars";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/login";

export default function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}
