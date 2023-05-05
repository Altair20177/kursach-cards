import styled from "styled-components";
import OneCard from "../cards/OneCard";
import Text from "../generic/Text";
import {
  useAcceptCardMutation,
  useGetCardsByAcceptQuery,
  useRejectCardMutation,
} from "../../store/cardApi";
import { Empty, Result, Spin, Layout, notification } from "antd";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Content } from "antd/es/layout/layout";

export default function AdminCardsToAccept() {
  // const [cardsToAccept, setCardsToAccept] = useState<CardType[]>([]);
  const {
    data: cardsToAccept,
    isLoading,
    isError,
    error,
  } = useGetCardsByAcceptQuery(undefined);
  const [fetchAcceptCard] = useAcceptCardMutation();
  const [fetchRejectCard] = useRejectCardMutation();
  // useEffect(() => {
  //   fetchCardsToAccept().then((data) => setCardsToAccept(data));
  // }, []);

  function acceptCard(cardId: number) {
    fetchAcceptCard(cardId).then(() => {
      notification.success({
        message: "Карточка утверждена",
      });
    });
  }

  function rejectCard(cardId: number) {
    fetchRejectCard(cardId).then(() => {
      notification.info({
        message: "Карточка отклонена",
      });
    });
  }
  if (isLoading) {
    return (
      <Content
        style={{
          width: "100vw",
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
  if (!cardsToAccept?.length) {
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
        <Empty description={"Список карточек пуст"} />
      </Content>
    );
  }
  return (
    <>
      <Title>Карточки на утверждение</Title>
      {cardsToAccept.map((card) => (
        <CardsContainer key={card.id}>
          <div key={card.id}>
            <OneCard withHeart={false} key={card.id} cardAbout={card} />
            <ButtonsBlock>
              <Button onClick={() => acceptCard(card.id)}>
                <Text align="center" size={16}>
                  Утвердить
                </Text>
              </Button>
              <Button onClick={() => rejectCard(card.id)}>
                <Text align="center" size={16}>
                  Отклонить
                </Text>
              </Button>
            </ButtonsBlock>
          </div>
        </CardsContainer>
      ))}
    </>
  );
}

const ButtonsBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-bottom: 100px;
`;

const Button = styled.div`
  background: #335250;
  border-radius: 20px;
  transition: 0.2s;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px 30px;
  width: fit-content;

  &:hover {
    background: #335250de;
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  line-height: 29px;
  color: rgba(53, 53, 53, 0.6);
  position: relative;
  margin: 30px 0;
  margin-left: -105px;
  padding-left: 120px;

  &::after {
    position: absolute;
    content: "";
    width: 459px;
    left: 0;
    bottom: -10px;
    height: 1.5px;
    background-color: rgba(53, 53, 53, 0.6);
  }
`;
