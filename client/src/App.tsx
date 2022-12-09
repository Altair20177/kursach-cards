import Footer from "./components/footer/Footer";
import Header from "./components/headers/Header";
import MainMenu from "./components/mainMenu/MainMenu";
import { Routes, Route, Navigate } from "react-router-dom";
import Cards from "./components/cards/Cards";
import { useState } from "react";
import { CategoryType } from "./types";
import cinema from "./components/mainMenu/images/cinema.png";
import Favorites from "./components/cards/Favorites";

const categories: Array<CategoryType> = [
  {
    id: 0,
    image: cinema,
    title: "Кино",
    link: "cinema",
  },
  {
    id: 1,
    image: cinema,
    title: "Театр",
    link: "theatre",
  },
  {
    id: 2,
    image: cinema,
    title: "Выставки",
    link: "exhibitions",
  },
  {
    id: 3,
    image: cinema,
    title: "Цирк",
    link: "circus",
  },
  {
    id: 4,
    image: cinema,
    title: "Мастер-классы",
    link: "masters",
  },
];

function App() {
  const [showBigHeader, setShowBigHeader] = useState<boolean>(
    window.location.pathname === "/main" ? true : false
  );

  return (
    <>
      <Header size={showBigHeader ? "big" : "small"} />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route
          path="/main"
          element={
            <MainMenu
              categories={categories}
              setShowBigHeader={setShowBigHeader}
            />
          }
        />
        <Route
          path="/main/:category"
          element={<Cards categories={categories} />}
        />
        <Route path="/main/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
