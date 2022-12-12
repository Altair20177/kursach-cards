import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Text from "../generic/Text";
import Input from "./Input";
import TextArea from "./TextArea";
import { ReactComponent as Plus } from "./images/plus.svg";
import { useState } from "react";

export default function AdminInputs() {
  const { pathname } = useLocation();
  const [isImagesLoaded1, setIsImageLoaded1] = useState<boolean>(false);

  function checkFile(e: any) {
    setIsImageLoaded1(true);
  }

  return (
    <Container>
      <Rows>
        <Row>
          {pathname === "/admin/publish-new-card" ? (
            <>
              <Input height={40} label="Название события" />
              <TextArea
                comment="Допустимое число символов - 1000"
                height={89}
                label="Описание"
              />
              <Input height={40} label="Адрес организации" />
              <Input height={40} label="Время работы" />
              <Input height={40} label="Веб-сайт организации" />
              <Button>
                <Text size={16}>Сохранить</Text>
              </Button>
            </>
          ) : (
            <>
              <Input height={40} label="Название события" />
              <TextArea
                comment="Допустимое число символов - 150"
                height={89}
                label="Описание"
              />
              <Input height={35} label="Время начала мероприятия" />
              <Input height={35} label="Время окончания мероприятия" />
              <Button>
                <Text size={16}>Отправить на утверждение</Text>
              </Button>
            </>
          )}
        </Row>
        <form>
          <AddImage>
            <UploadFile
              onChange={(e) => checkFile(e)}
              type="file"
              id="file-input"
              multiple
            />
            <Label isImagesLoaded1={isImagesLoaded1} htmlFor="file-input">
              Добавить изображение
            </Label>
            <Plus width={15} height={15} />
          </AddImage>
          <Text pt={10} size={10} color="rgba(41, 41, 41, 0.34)">
            {isImagesLoaded1
              ? "Изображения добавлены"
              : "Добавьте минимум одно изображение"}
          </Text>
        </form>
      </Rows>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1350px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 45px;
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

const Button = styled.button`
  background: #335250;
  border-radius: 20px;
  padding: 20px 100px;
  transition: 0.2s;

  &:hover {
    background: #335250de;
  }
`;

const Rows = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const AddImage = styled.div`
  display: flex;
  align-items: center;
`;

const Row = styled.div`
  width: 60%;
`;
