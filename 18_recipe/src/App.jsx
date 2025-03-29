import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recipe from "./page/Recipe";
import About from "./page/About";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
