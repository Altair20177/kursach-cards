import { Content } from "antd/es/layout/layout";
import NewsForm from "../components/news/NewsForm";

const NewsPageCreate = () => {
  return (
    <Content
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "100px",
      }}
    >
      <NewsForm
        news={{
          name: "",
          image: "",
          createdAt: "",
          description: "",
          updatedAt: "",
          id: 0,
        }}
      />
    </Content>
  );
};

export default NewsPageCreate;
