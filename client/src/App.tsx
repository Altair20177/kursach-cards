import Footer from "./components/footer/Footer";
import Header from "./components/headers/Header";
import { useEffect, useState } from "react";
import { check } from "./http/userAPI";
import { useAppDispatch } from "./store/hooks";
import { authorizeUser, setUserData } from "./store/userSlice";
import { Routing } from "./routes";
import { MainContext } from "./context";

function App() {
  const dispatch = useAppDispatch();
  const [showBigHeader, setShowBigHeader] = useState<boolean>(
    window.location.pathname === "/main"
  );
  useEffect(() => {
    localStorage.getItem("token") &&
      check().then((data) => {
        dispatch(authorizeUser(true));
        dispatch(setUserData(data));
      });
  }, [dispatch]);

  return (
    <MainContext.Provider
      value={{
        showBigHeader,
        setShowBigHeader,
      }}
    >
      <Header size={showBigHeader ? "big" : "small"} />
      <main>
        <Routing />
      </main>
      <Footer />
    </MainContext.Provider>
  );
}

export default App;
