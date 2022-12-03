import React from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/headers/Header";
import MainMenu from "./components/mainMenu/MainMenu";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Header size="big" />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainMenu />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
