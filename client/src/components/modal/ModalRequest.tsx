import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { createRequest } from "../../http/organizationApi";
import Message from "../generic/Message";
import Text from "../generic/Text";
import { useGetCategoriesQuery } from "../../store/categoryApi";

const categoriesDesc: { name: string; title: string }[] = [
  {
    name: "Рестораны",
    title: "restaraunts",
  },
  {
    name: "Кино",
    title: "cinema",
  },
  {
    name: "Театр",
    title: "theatre",
  },
  {
    name: "Выставки",
    title: "exhibitions",
  },
  {
    name: "Цирк",
    title: "circus",
  },
  {
    name: "Мастер-классы",
    title: "master-classes",
  },
  {
    name: "Встречи",
    title: "meets",
  },
  {
    name: "Экскурсии",
    title: "excursions",
  },
  {
    name: "Спорт",
    title: "sport",
  },
  {
    name: "Обучение",
    title: "lessons",
  },
  {
    name: "Детям",
    title: "children",
  },
  {
    name: "Концерты",
    title: "concerts",
  },
  {
    name: "Бары",
    title: "bars",
  },
  {
    name: "Клубы",
    title: "clubs",
  },
  {
    name: "Другое",
    title: "other",
  },
];

export default function ModalRequest({
  setIsOpen,
}: {
  setIsOpen: (flag: boolean) => void;
}) {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesQuery(undefined);
  const [organization, setOrganization] = useState<string>("");
  const [sphere, setSphere] = useState<string>(
    !!categories?.length ? categories[0].categoryName : ""
  );
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);

  function sendRequest() {
    if (categories?.find((category) => category.categoryName === sphere)) {
      createRequest(
        organization,
        categories?.find((category) => category.categoryName === sphere)
          ?.categoryName,
        phone,
        address,
        Number(localStorage.getItem("userId"))
      );
      setIsOpen(false);
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
  }

  useEffect(() => {
    if (!categories) {
      return;
    }
    setSphere(categories[0].categoryName);
  }, [categories]);

  return (
    <Block>
      <RequestHeader>
        <Text align="center" size={18} lh={22} color="#000000">
          Заявка на создание учетной записи администратора организации
        </Text>
      </RequestHeader>
      <Body>
        <Text pt={10} pb={10} size={16} lh={20} color="#292929">
          Название организации/заведения
        </Text>
        <Input
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <Row>
          <div>
            <Text pt={10} pb={10} size={16} lh={20} color="#292929">
              Сфера деятельности
            </Text>
            <Select onChange={(e) => setSphere(e.target.value)} value={sphere}>
              {categories?.map(({ categoryName }) => (
                <option value={categoryName} key={categoryName}>
                  {categoryName}
                </option>
              ))}
            </Select>
            {/* <Input
              value={sphere}
              onChange={(e) => setSphere(e.target.value)}
              width={100}
            /> */}
          </div>
          <div>
            <Text pt={10} pb={10} size={16} lh={20} color="#292929">
              Мобильный телефон
            </Text>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </Row>

        <Text pt={10} pb={10} size={16} lh={20} color="#292929">
          Адрес организации
        </Text>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          width={100}
        />
        <ButtonWrapper onClick={sendRequest} isAuthOrReg={false}>
          <SignIn>Подать заявку</SignIn>
        </ButtonWrapper>
      </Body>
      {showMessage && <Message>Такой категории не существует!</Message>}
    </Block>
  );
}

const AddImage = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const UploadFile = styled.input`
  position: absolute;
  visibility: hidden;
`;

const Label = styled.label<{ isImagesLoaded1: boolean }>`
  padding-right: 10px;
  font-size: 16px;
  color: #292929;

  &:hover {
    cursor: pointer;
  }

  ${(p) =>
    p.isImagesLoaded1 &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `}
`;

const Block = styled.div`
  background: #fafafa;
  box-shadow: 17px 15px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding-bottom: 40px;
`;

const Body = styled.div`
  padding: 0 50px;
`;

const Input = styled.input<{ width?: number }>`
  width: ${(p) => (p.width ? p.width : 100)}%;
  background: #ffffff;
  border: 1px solid rgba(53, 53, 53, 0.6);
  border-radius: 20px;
  height: 36px;
  padding-left: 15px;
  font-size: 16px;
`;

const Select = styled.select<{ width?: number }>`
  width: ${(p) => (p.width ? p.width : 100)}%;
  background: #ffffff;
  border: 1px solid rgba(53, 53, 53, 0.6);
  border-radius: 20px;
  height: 36px;
  padding-left: 15px;
  font-size: 16px;
`;

const RequestHeader = styled.div`
  padding: 20px 0 10px;
  border-bottom: 3px solid #0049457c;
`;

const ButtonWrapper = styled.div<{ isAuthOrReg: boolean }>`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: ${(p) => (p.isAuthOrReg ? "30" : "0")}px;
`;

const SignIn = styled.button`
  background: #335250;
  border-radius: 20px;
  padding: 0 30px;
  height: 31.25px;
  font-size: 16px;
  color: #ffffff;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
