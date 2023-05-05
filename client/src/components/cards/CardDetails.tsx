import React, { FC } from "react";
import { CardType } from "../../types";
import { Carousel, Empty, Image, Result, Space, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { getImageUrl } from "../../utils/url";
import { SmileOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

interface CardDetailsProps {
  card: CardType;
}

const contentStyle: React.CSSProperties = {
  height: "360px",
  color: "#fff",
  lineHeight: "360px",
  textAlign: "center",
  background: "#364d79",
};

const typographyStyle: React.CSSProperties = {
  fontSize: "2rem",
  lineHeight: "2rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  lineHeight: "1.5rem",
  fontWeight: "medium",
};

const spaceStyle: React.CSSProperties = {
  margin: "4rem 0",
};

const CardDetails: FC<CardDetailsProps> = ({ card }) => {
  const { photo1, photo2, photo3 } = card;
  return (
    <Content
      style={{
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: "100px",
      }}
    >
      <Content
        style={{
          maxWidth: "600px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography style={typographyStyle}>Название мероприятия</Typography>
        <Paragraph style={paragraphStyle}>{card.cardName}</Paragraph>
        <Space style={spaceStyle} />
        <Typography style={typographyStyle}>Краткое описание</Typography>
        <Paragraph style={paragraphStyle}>{card.description}</Paragraph>
        <Paragraph style={paragraphStyle}>
          Вход {card.isFree ? "бесплатный" : `платный. Цена - ${card.price}`}
        </Paragraph>
        <Space style={spaceStyle} />
        <Result
          status="success"
          title={`Событие проходит с ${new Date(
            card.dateTimeStart
          ).toLocaleDateString()} по ${new Date(
            card.dateTimeFinish
          ).toLocaleDateString()}`}
          icon={<SmileOutlined />}
          subTitle="Очень ждем вас"
        />
      </Content>
      {!![photo1, photo2, photo3].filter(Boolean).length ? (
        <Carousel
          style={{
            width: "600px",
          }}
          autoplay
        >
          {[photo1, photo2, photo3].map((photo) =>
            !!photo ? (
              <div style={contentStyle} key={photo}>
                <Image width={"100%"} height={360} src={getImageUrl(photo)} />
              </div>
            ) : null
          )}
        </Carousel>
      ) : (
        <Empty description={"Фотографии мероприятия отсутствуют"} />
      )}
    </Content>
  );
};

export default CardDetails;
