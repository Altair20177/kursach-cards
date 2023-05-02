import { useCallback, useMemo } from "react";
import {
  useDeleteNewsByIdMutation,
  useGetNewsQuery,
} from "../../store/newsApi";
import { Empty, Result, Spin, Layout, notification } from "antd";
import NewsItem from "./NewsItem";
import { useAppSelector } from "../../store/hooks";
import { getUserRole } from "../../store/userSlice";
import { Content } from "antd/es/layout/layout";

const NewsList = () => {
  const { data: news, isLoading, isError } = useGetNewsQuery(undefined);
  const userRole = useAppSelector(getUserRole);
  const canRemove = useMemo(() => userRole === "superAdmin", [userRole]);
  const [fetchDeleteNews] = useDeleteNewsByIdMutation();
  const removeNewsHandler = useCallback(
    (id: number) => {
      if (!canRemove) {
        return;
      }
      fetchDeleteNews(id).then(() => {
        notification.success({
          message: `Новость с id ${id} удалена!`,
          duration: 1500,
        });
      });
    },
    [canRemove, fetchDeleteNews]
  );
  if (isLoading) {
    return (
      <Layout>
        <Spin />;
      </Layout>
    );
  }
  if (isError) {
    return (
      <Result
        status="error"
        title={"Ошибка при загрузке новостей"}
        subTitle="Перед повторной отправкой проверьте и измените следующую информацию."
      >
        Произошла ошибка при запросе
      </Result>
    );
  }
  if (!news?.length) {
    return <Empty description={"Список новостей пуст"} />;
  }
  return (
    <Content
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6,1fr)",
        gridColumnGap: 20,
        padding: "30px 20px",
      }}
    >
      {news?.map((newItem) => (
        <NewsItem
          newItem={newItem}
          removeNews={removeNewsHandler}
          canRemove={canRemove}
          key={newItem.id}
        />
      ))}
    </Content>
  );
};

export default NewsList;
