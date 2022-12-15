import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  fetchAcceptCard,
  fetchCardsToAccept,
  fetchRejectCard,
} from "../../http/cardApi";
import { CardType } from "../../types";
import OneCard from "../cards/OneCard";
import Message from "../generic/Message";
import Text from "../generic/Text";

export default function AdminCardsToAccept() {
  const [cardsToAccept, setCardsToAccept] = useState<CardType[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetchCardsToAccept().then((data) => setCardsToAccept(data));
  }, []);

  function acceptCard(cardId: number) {
    fetchAcceptCard(cardId);
    setCardsToAccept(cardsToAccept.filter((card) => card.id !== cardId));
    setStatus(" утверждена");

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }

  function rejectCard(cardId: number) {
    fetchRejectCard(cardId);
    setCardsToAccept(cardsToAccept.filter((card) => card.id !== cardId));
    setStatus(" отклонена");

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }

  return (
    <>
      <Title>Карточки на утверждение</Title>
      {cardsToAccept.length !== 0 ? (
        cardsToAccept.map((card: CardType) => {
          return (
            <CardsContainer>
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
          );
        })
      ) : (
        <Text color="black" align="center" size={50} mt={100} mb={300}>
          Карточек на утверждение нет!
        </Text>
      )}

      {showMessage && <Message>карточка{status}</Message>}
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
