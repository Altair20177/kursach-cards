import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addCardToFavourites } from "../../http/cardApi";
import { useAppSelector } from "../../store/hooks";
import { CardType } from "../../types";
import Text from "../generic/Text";
import { ReactComponent as HeartSvg } from "../headers/images/heart_1.svg";
import { ReactComponent as RedHeartSvg } from "../headers/images/red_heart.svg";
import { Button, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getImageUrl } from "../../utils/url";
import { getUserRole } from "../../store/userSlice";

interface OneCardProps {
  cardAbout: CardType;
  withHeart?: boolean;
  withRedHeart?: boolean;
  onDeleteCard?: (id: number) => void;
  deleteFromFavourites?: (id: number) => void;
}

export default function OneCard({
  cardAbout,
  withHeart,
  withRedHeart,
  deleteFromFavourites,
  onDeleteCard,
}: OneCardProps) {
  const { isAuthorized } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const userRole = useAppSelector(getUserRole);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  function addToFavourites(cardId: number) {
    // setShowMessage(true);
    // setTimeout(() => setShowMessage(false), 4000);

    if (isAuthorized) {
      addCardToFavourites(cardId, localStorage.getItem("userId")).then(() => {
        notification.success({
          message: "Карточка добавлена в избранные",
        });
      });
    }
  }
  return (
    <>
      {cardAbout && (
        <Block>
          {withHeart && (
            <HeartWrapper onClick={() => addToFavourites(cardAbout.id)}>
              <HeartSvg width={25} height={25} />
            </HeartWrapper>
          )}
          {withRedHeart && deleteFromFavourites && (
            <HeartWrapper onClick={() => deleteFromFavourites(cardAbout.id)}>
              <RedHeartSvg width={25} height={25} />
            </HeartWrapper>
          )}
          <Image src={cardAbout.photo1} />
          <Description>
            <Text pb={10} color="rgba(0, 0, 0, 0.53)" size={16} lh={20}>
              {cardAbout.cardName}
            </Text>
            <Address>
              <Text
                onClick={() => navigate(`${cardAbout.webSite}`)}
                pb={15}
                underline
                color="rgba(31, 31, 31, 0.79)"
                size={11}
              >
                {cardAbout.webSite}
              </Text>
              <Text pl={5} color="rgba(31, 31, 31, 0.79)" size={11}>
                {cardAbout.eventAddress}
              </Text>
            </Address>
            <Text color="rgba(31, 31, 31, 0.79)" size={9} ls={0.115}>
              {cardAbout.dateTimeStart
                ?.split("T")[0]
                .split("-")
                .reverse()
                .join("-")}{" "}
              -{" "}
              {cardAbout.dateTimeFinish
                ?.split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
            </Text>
            <Footer
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Text color="#DECDA9" size={12} lh={15}>
                Вход{" "}
                {cardAbout.isFree
                  ? `свободный`
                  : `платный. Цена - ${cardAbout.price}`}
              </Text>
              <Text
                onClick={() => (window.location.href = `${cardAbout.webSite}`)}
                underline
                color="#DECDA9"
                size={12}
                lh={15}
              >
                {cardAbout.webSite || ""}
              </Text>
            </Footer>
            <Button onClick={() => navigate(`/cards/${cardAbout?.id}`)}>
              Подробнее
            </Button>
            {(userRole === "admin" || userRole === "superAdmin") &&
            onDeleteCard ? (
              <Button onClick={() => onDeleteCard!(cardAbout.id)}>
                <DeleteOutlined />
              </Button>
            ) : null}
          </Description>
        </Block>
      )}
      {/* {showMessage && (
        <Message>
          {isAuthorized
            ? "Карточка добавлена в избранное"
            : "Необходимо авторизоваться!"}
        </Message>
      )} */}
    </>
  );
}

const Block = styled.div`
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 289px;
  position: relative;
  margin: 0 auto;
  margin-top: 40px;
`;

const Image = styled.div<{ src: string }>`
  height: 230px;
  width: 100%;
  margin-bottom: 10px;
  background-image: url(${(p) => `${getImageUrl(p.src)}`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const Address = styled.div`
  display: flex;
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const Description = styled.div`
  padding: 0 21px 15px;
`;

const HeartWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;

  &:hover {
    cursor: pointer;
  }
`;
