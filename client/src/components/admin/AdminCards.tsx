import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CardType } from "../../types";
import OneCard from "../cards/OneCard";
import ModalContainer from "../generic/ModalContainer";
import Text from "../generic/Text";

export default function AdminCards() {
  const { pathname } = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const cards: CardType[] = [
    {
      id: 1,
      name: "Card 1",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, magnam.",
      category: "",
    },
    {
      id: 2,
      name: "Card 2",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, magnam.",
      category: "",
    },
  ];
  return (
    <>
      {pathname === "/admin/published-cards" ? (
        <>
          <Title>Опубликованные карточки</Title>
          <CardsContainer>
            {cards.map((card: CardType) => {
              return (
                <OneCard withHeart={false} key={card.id} cardAbout={card} />
              );
            })}
          </CardsContainer>
        </>
      ) : (
        <>
          <Title>Карточки на утверждение</Title>
          <CardsContainer>
            {cards.map((card: CardType) => {
              return (
                <div>
                  <OneCard withHeart={false} key={card.id} cardAbout={card} />
                  <ButtonsBlock>
                    <Button>
                      <Text align="center" size={16}>
                        Утвердить
                      </Text>
                    </Button>
                    <Button>
                      <Text align="center" size={16}>
                        Отправить на доработку
                      </Text>
                    </Button>
                  </ButtonsBlock>
                </div>
              );
            })}
          </CardsContainer>
          <ModalContainer
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
          >
            
          </ModalContainer>
        </>
      )}
    </>
  );
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
`;

const ButtonsBlock = styled.div`
  width: 80%;
  margin: 0 auto;
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
