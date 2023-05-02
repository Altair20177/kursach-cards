import { Spin, Result, Empty, Layout } from "antd";
import NewsList from "../components/news/NewsList";

const NewsPage = () => {
  return (
    <Layout
      style={{
        background: "transparent",
      }}
    >
      <NewsList />
    </Layout>
  );
};

export default NewsPage;
