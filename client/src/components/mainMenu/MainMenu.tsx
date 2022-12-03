import styled from "styled-components";
import { Category, OneNews } from "../../types";
import Text from "../generic/Text";
import newsImage from "./images/news_image.png";
import cinema from "./images/cinema.png";

const news: Array<OneNews> = [
  {
    id: 0,
    image: newsImage,
    text: "Открытие нового кинотеатра в Минске!",
  },
  {
    id: 1,
    image: newsImage,
    text: "В Минском Национальном музее проводят реставрацию музейных ценностей",
  },
  {
    id: 2,
    image: newsImage,
    text: "Сеть ресторанов Макдональдс уходит из Беларуси!",
  },
];

const categories: Array<Category> = [
  {
    id: 0,
    image: cinema,
    title: "Кино",
  },
  {
    id: 1,
    image: cinema,
    title: "Театр",
  },
  {
    id: 2,
    image: cinema,
    title: "Выставки",
  },
  {
    id: 3,
    image: cinema,
    title: "Цирк",
  },
  {
    id: 4,
    image: cinema,
    title: "Мастер-классы",
  },
];

export default function MainMenu() {
  return (
    <>
      <Title>Новости</Title>
      <Content>
        {news.map((news: OneNews) => (
          <News key={news.id}>
            <Img src={news.image} alt="news_image" />
            <Text size={16} lh={20} color="#335250">
              {news.text}
            </Text>
          </News>
        ))}
      </Content>
      <Title>Категории</Title>
      <Categories>
        {categories.map((category: Category) => (
          <CategoryBlock key={category.id} image={category.image}>
            <Text color="#FFFFFF" size={24}>
              {category.title}
            </Text>
          </CategoryBlock>
        ))}
      </Categories>
    </>
  );
}

const Title = styled.h2`
  color: #c1a875;
  font-size: 48px;
  line-height: 59px;
  position: relative;
  padding-left: 132px;
  margin: 80px 0;

  &::after {
    position: absolute;
    content: "";
    width: 359px;
    left: 0;
    bottom: -10px;
    height: 1.5px;
    background-color: #c1a875;
  }
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: 1250px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const Categories = styled(Content)`
  display: grid;
  grid-template-columns: repeat(4, 238px);
  padding: 0 20px;
`;

const CategoryBlock = styled.div<{ image: string }>`
  width: 238px;
  height: 234px;
  background-image: url(${(p) => p.image});
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 43px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const News = styled.div`
  width: 346px;
  height: 121px;
  background: rgba(243, 243, 242, 0.4);
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  padding-right: 15px;
`;
