import Footer from "./components/footer/Footer";
import Header from "./components/headers/Header";
import MainMenu from "./components/mainMenu/MainMenu";
import { Routes, Route, Navigate } from "react-router-dom";
import Cards from "./components/cards/Cards";
import { useEffect, useState } from "react";
import Favorites from "./components/cards/Favorites";
import AdminPanel from "./pages/AdminPanel";
import AdminInputs from "./components/admin/AdminInputs";
import AdminCards from "./components/admin/AdminCards";
import { check } from "./http/userAPI";
import { useAppDispatch } from "./store/hooks";
import { authorizeUser, setUserData } from "./store/userSlice";
import Organization from "./pages/Organization";
import AdminCardsToAccept from "./components/admin/AdminCardsToAccept";
import AdminMainPanel from "./components/admin/AdminMainPanel";
import AdminRequestPanel from "./components/admin/AdminRequestPanel";

function App() {
  const dispatch = useAppDispatch();
  const [showBigHeader, setShowBigHeader] = useState<boolean>(
    window.location.pathname === "/main" ? true : false
  );

  useEffect(() => {
    localStorage.getItem("token") &&
      check().then((data) => {
        dispatch(authorizeUser(true));
        dispatch(setUserData(data));
      });
  }, []);

  return (
    <>
      <Header size={showBigHeader ? "big" : "small"} />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route
          path="/main"
          element={<MainMenu setShowBigHeader={setShowBigHeader} />}
        />
        <Route path="/main/:category" element={<Cards />} />
        <Route
          path="/main/:category/:organization"
          element={<Organization />}
        />
        <Route path="/main/favorites" element={<Favorites />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="managing-panel" element={<AdminMainPanel />} />
          <Route path="requests" element={<AdminRequestPanel />} />
          <Route path="cards-to-accept" element={<AdminCardsToAccept />} />
          <Route path="published-cards" element={<AdminCards />} />
          <Route path="publish-new-card" element={<AdminInputs />} />
          <Route path="update-profile" element={<AdminInputs />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
