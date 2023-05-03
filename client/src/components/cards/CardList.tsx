import { useGetCardsByCategoryQuery } from "../../store/cardApi";
import { Spin, Empty, notification, Layout } from "antd";
import OneCard from "./OneCard";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const CardList = () => {
  const { categoryId } = useParams();
  const {
    data: cards,
    isLoading,
    isError,
    error,
  } = useGetCardsByCategoryQuery(categoryId as string, {
    skip: !categoryId,
  });
  if (isLoading) {
    return (
      <Layout>
        <Spin />;
      </Layout>
    );
  }
  if (isError && error) {
    notification.error({
      message: "smth",
    });
  }
  if (!cards?.length) {
    return <Empty description={" Карточек на данную категорию нет!"} />;
  }
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
      {" "}
      <CardsContainer>
        {cards.map((card) => {
          return <OneCard withHeart key={card.id} cardAbout={card} />;
        })}
      </CardsContainer>
    </Content>
  );
};

export default CardList;
