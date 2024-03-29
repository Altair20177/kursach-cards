import styled from "styled-components";
import { CategoryType, CategoryTypeFetch } from "../../types";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { fetchCategories } from "../../http/categoriesApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAllCategories } from "../../store/categoiesSlice";
import { MainContext } from "../../context";
import NewsList from "../news/NewsList";

// const news: Array<OneNewsType> = [
//   {
//     id: 0,
//     image: firstNews,
//     text: "Открытие нового кинотеатра в Минске!",
//   },
//   {
//     id: 1,
//     image: secondNews,
//     text: "В Минском Национальном музее проводят реставрацию музейных ценностей",
//   },
//   {
//     id: 2,
//     image: thirdNews,
//     text: "Сеть ресторанов Макдональдс уходит из Беларуси!",
//   },
// ];

const categoriesClient: Array<CategoryType> = [
  {
    image: "./images/categories/cinema",
    link: "cinema",
  },
  {
    image: "./images/categories/theatre",
    link: "theatre",
  },
  {
    image: "./images/categories/exhibitions",
    link: "exhibitions",
  },
  {
    image: "./images/categories/circus",
    link: "circus",
  },
  {
    image: "./images/categories/master-classes",
    link: "master-classes",
  },
  {
    image: "./images/categories/restaraunts",
    link: "restaraunts",
  },
  {
    image: "./images/categories/meets",
    link: "meets",
  },
  {
    image: "./images/categories/excursions",
    link: "excursions",
  },
  {
    image: "./images/categories/sport",
    link: "sport",
  },
  {
    image: "./images/categories/lessons",
    link: "lessons",
  },
  {
    image: "./images/categories/children",
    link: "children",
  },
  {
    image: "./images/categories/concerts",
    link: "concerts",
  },
  {
    image: "./images/categories/bars",
    link: "bars",
  },
  {
    image: "./images/categories/clubs",
    link: "clubs",
  },
  {
    image: "./images/categories/other",
    link: "other",
  },
];

export default function MainMenu() {
  const { setShowBigHeader } = useContext(MainContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((store) => store.categories);

  useEffect(() => {
    fetchCategories().then((categories) =>
      dispatch(setAllCategories(categories))
    );

    setShowBigHeader(true);

    return () => {
      setShowBigHeader(false);
    };
  }, []);

  function chooseCategory(category: string) {
    navigate(`${category}`);
  }
  return (
    <>
      <Title>Новости</Title>
      <NewsList />
      <Title>Категории</Title>
      <Categories>
        {categories?.map((category: CategoryTypeFetch) => {
          return (
            <CategoryBlock
              onClick={() => chooseCategory(category.id.toString())}
              key={category.id}
              image={
                categoriesClient.findIndex(
                  (obj) => obj.link === category.categoryName
                ) !== -1
                  ? require(`${
                      categoriesClient.find(
                        (obj) => obj.link === category.categoryName
                      )?.image
                    }.png`)
                  : `https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg`
              }
              title={category.categoryName}
            ></CategoryBlock>
          );
        })}
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
  background-position: center;
  background-size: cover;
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
