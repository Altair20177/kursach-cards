import { useParams } from "react-router-dom";
import { useGetNewByIdQuery } from "../store/newsApi";
import { Spin, Result, Empty } from "antd";
import NewsForm from "../components/news/NewsForm";
import { Content } from "antd/es/layout/layout";

const NewsIdPage = () => {
  const { id } = useParams();
  const {
    data: news,
    isLoading,
    isError,
  } = useGetNewByIdQuery(+id!, {
    skip: !id,
  });
  if (isLoading) {
    return (
      <Content
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </Content>
    );
  }
  if (isError) {
    return (
      <Result
        status="error"
        title={"Ошибка при загрузке новости"}
        subTitle="Перед повторной отправкой проверьте и измените следующую информацию."
      >
        Произошла ошибка при запросе
      </Result>
    );
  }
  if (!news) {
    return (
      <Content
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Empty description={"Новости нет..."} />
      </Content>
    );
  }
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
      <NewsForm news={news} />
    </Content>
  );
};

export default NewsIdPage;
