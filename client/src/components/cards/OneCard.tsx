import { useState } from "react";
import styled from "styled-components";
import { CardType } from "../../types";
import Message from "../generic/Message";
import { ReactComponent as HeartSvg } from "../headers/images/heart_1.svg";

interface OneCardProps {
  cardAbout: CardType;
}

export default function OneCard({ cardAbout }: OneCardProps) {
  const isUserAuthorized = false;

  const [showMessage, setShowMessage] = useState<boolean>(false);

  function addToFavourites(cardId: number) {
    if (isUserAuthorized) {
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
  }

  return (
    <>
      <Block>
        <HeartWrapper onClick={() => addToFavourites(cardAbout.id)}>
          <HeartSvg width={25} height={25} />
        </HeartWrapper>
      </Block>
      {showMessage && <Message>Необходимо авторизоваться!</Message>}
    </>
  );
}

const Block = styled.div`
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 289px;
  height: 369px;
  position: relative;
  margin: 0 auto;
  margin-top: 40px;
`;

const HeartWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;

  &:hover {
    cursor: pointer;
  }
`;
