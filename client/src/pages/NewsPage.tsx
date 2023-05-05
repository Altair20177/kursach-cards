import { Layout, Button } from "antd";
import NewsList from "../components/news/NewsList";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { getUserRole } from "../store/userSlice";
import { useMemo } from "react";

const NewsPage = () => {
  const userRole = useAppSelector(getUserRole);
  const isSuperAdmin = useMemo(() => userRole === "superAdmin", [userRole]);
  return (
    <Layout
      style={{
        background: "transparent",
        marginTop: 20,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      {isSuperAdmin ? (
        <Button
          style={{
            width: "max-content",
            marginLeft: 20,
          }}
        >
          <Link to={"/news/create"}>Создать новую новость</Link>
        </Button>
      ) : null}
      <NewsList />
    </Layout>
  );
};

export default NewsPage;
