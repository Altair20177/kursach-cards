import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { Spin } from "antd";
import { Content } from "antd/es/layout/layout";

const MainMenu = lazy(() => import("../components/mainMenu/MainMenu"));
const Cards = lazy(() => import("../components/cards/Cards"));
const Organization = lazy(() => import("../pages/Organization"));
const AdminRequestPanel = lazy(
  () => import("../components/admin/AdminRequestPanel")
);
const AdminMainPanel = lazy(() => import("../components/admin/AdminMainPanel"));
const AdminInputs = lazy(() => import("../components/admin/AdminInputs"));
const AdminCards = lazy(() => import("../components/admin/AdminCards"));
const AdminCardsToAccept = lazy(
  () => import("../components/admin/AdminCardsToAccept")
);
const Favorites = lazy(() => import("../components/cards/Favorites"));
const AdminPanel = lazy(() => import("../pages/AdminPanel"));
const NewsPage = lazy(() => import("../pages/NewsPage"));
const NewsIdPage = lazy(() => import("../pages/NewsIdPage"));
const NewsPageCreate = lazy(() => import("../pages/NewsPageCreate"));
const CardPage = lazy(() => import("../pages/CardPage"));

export const Routing = () => {
  return (
    <Suspense
      fallback={
        <Content
          style={{
            width: "100vw",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin tip={"Загрузка  страницы"} />
        </Content>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainMenu />} />
        <Route path="/main/:categoryId" element={<Cards />} />
        <Route
          path="/main/:category/:organization"
          element={<Organization />}
        />
        <Route path="/main/favorites" element={<Favorites />} />
        <Route path="/cards/:id" element={<CardPage />} />
        <Route path="/news">
          <Route path=":id" element={<NewsIdPage />} />
          <Route
            path="create"
            element={
              <PrivateRoute accessRoles={["superAdmin"]}>
                <NewsPageCreate />
              </PrivateRoute>
            }
          />
          <Route index element={<NewsPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute accessRoles={["admin", "superAdmin"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        >
          <Route
            path="managing-panel"
            element={
              <PrivateRoute accessRoles={["admin", "superAdmin"]}>
                <AdminMainPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="requests"
            element={
              <PrivateRoute accessRoles={["admin", "superAdmin"]}>
                <AdminRequestPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="cards-to-accept"
            element={
              <PrivateRoute accessRoles={["admin", "superAdmin"]}>
                <AdminCardsToAccept />
              </PrivateRoute>
            }
          />
          <Route
            path="published-cards"
            element={
              <PrivateRoute accessRoles={["admin", "superAdmin"]}>
                <AdminCards />
              </PrivateRoute>
            }
          />
          <Route
            path="publish-new-card"
            element={
              <PrivateRoute accessRoles={["admin", "superAdmin"]}>
                <AdminInputs />
              </PrivateRoute>
            }
          />
          <Route
            path="update-profile"
            element={
              <PrivateRoute accessRoles={["admin", "superAdmin"]}>
                <AdminInputs />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

{
  /* <Routes>
  <Route path="/" element={<Navigate to="/main" />} />
  <Route path="/main" element={<MainMenu />} />
  <Route path="/main/:categoryId" element={<Cards />} />
  <Route path="/main/:category/:organization" element={<Organization />} />
  <Route path="/main/favorites" element={<Favorites />} />
  <Route path="/admin" element={<AdminPanel />}>
    <Route path="managing-panel" element={<AdminMainPanel />} />
    <Route path="requests" element={<AdminRequestPanel />} />
    <Route path="cards-to-accept" element={<AdminCardsToAccept />} />
    <Route path="published-cards" element={<AdminCards />} />
    <Route path="publish-new-card" element={<AdminInputs />} />
    <Route path="update-profile" element={<AdminInputs />} />
  </Route>
</Routes>; */
}
