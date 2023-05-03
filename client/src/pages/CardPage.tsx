import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Layout, Spin, Result, Empty, notification } from "antd";
import { useParams } from "react-router-dom";
import { useGetCardByIdQuery } from "../store/cardApi";
import { Content } from "antd/es/layout/layout";
import CardForm from "../components/cards/CardForm";

const CardPage = () => {
  const { id } = useParams();
  const { data: card, isLoading, isError, error } = useGetCardByIdQuery(id!);
  if (isLoading) {
    return (
      <Layout
        style={{
          background: "transparent",
          height: "auto",
        }}
      >
        <Spin />
      </Layout>
    );
  }
  if (isError) {
    return (
      <Result
        status="error"
        title={"Ошибка при загрузке карточек"}
        subTitle="Перед повторной отправкой проверьте и измените следующую информацию."
      >
        Причина: {(error as FetchBaseQueryError)?.status}
      </Result>
    );
  }
  if (!card) {
    return <Empty description={"Карточка отсутствует"} />;
  }
  if (card?.toAccept) {
    notification.info({
      message: "Внимание! Данная карточка пока не одобрена администратором",
    });
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
      <CardForm card={card!} />
    </Content>
  );
};

export default CardPage;
