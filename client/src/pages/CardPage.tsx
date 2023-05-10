import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Spin, Result, Empty } from "antd";
import { useParams } from "react-router-dom";
import { useGetCardByIdQuery } from "../store/cardApi";
import { Content } from "antd/es/layout/layout";
import CardForm from "../components/cards/CardForm";
import { useEffect, useState } from "react";
import { fetchOrganizationByAdmin } from "../http/organizationApi";

const CardPage = () => {
  const { id } = useParams();
  const { data: card, isLoading, isError, error } = useGetCardByIdQuery(id!);
  const [organizationId, setOrganizationId] = useState<number>(0);
  useEffect(() => {
    fetchOrganizationByAdmin(localStorage.getItem("userId")).then((data) =>
      setOrganizationId(data?.id)
    );
  }, []);
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
        title={"Ошибка при загрузке карточек"}
        subTitle="Перед повторной отправкой проверьте и измените следующую информацию."
      >
        Причина: {(error as FetchBaseQueryError)?.status}
      </Result>
    );
  }
  if (!card) {
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
        <Empty description={"Карточка нет..."} />
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
      <CardForm card={{ ...card!, organizationId }} />
    </Content>
  );
};

export default CardPage;
