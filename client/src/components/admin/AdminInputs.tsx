import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Text from "../generic/Text";
import Input from "./Input";
import TextArea from "./TextArea";
import { ReactComponent as Plus } from "./images/plus.svg";
import { useEffect, useState } from "react";
import Message from "../generic/Message";
import { createCard } from "../../http/cardApi";
import { OrganizationType } from "../../types";
import {
  fetchOrganizationByAdmin,
  updateOrganization,
} from "../../http/organizationApi";

export default function AdminInputs() {
  const { pathname } = useLocation();
  const [isImagesLoaded1, setIsImageLoaded1] = useState<boolean>(false);
  const [isImagesLoaded2, setIsImageLoaded2] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showMessage2, setShowMessage2] = useState<boolean>(false);

  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [eventAddress, setEventAddress] = useState<string>("");
  const [cardImages, setCardImages] = useState<File[]>([]);

  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationDescription, setOrganizationDescription] =
    useState<string>("");
  const [organizationAddress, setOrganizationAddress] = useState<string>("");
  const [workTime, setWorkTime] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [organizationImages, setOrganizationImages] = useState<File[]>([]);

  const [organizationData, setOrganizationData] =
    useState<OrganizationType>(null);

  useEffect(() => {
    fetchOrganizationByAdmin(localStorage.getItem("userId")).then((data) =>
      setOrganizationData(data)
    );

    if (organizationData) {
      setWebsite(organizationData?.webSite || "");
      setOrganizationAddress(organizationData?.organizationAddress || "");
      setWorkTime(organizationData?.workTime || "");
      setOrganizationDescription(organizationData?.description || "");
      setOrganizationName(organizationData?.name || "");
    }
  }, [organizationData?.id]);

  function checkFile2(e: any) {
    setIsImageLoaded1(true);
    setCardImages(e.target.files);
  }

  function checkFile1(e: any) {
    setIsImageLoaded2(true);
    setOrganizationImages(e.target.files);
  }

  function condition1() {
    if (
      !eventAddress ||
      !eventName ||
      !eventDescription ||
      !startDate ||
      !endDate ||
      !eventAddress ||
      !cardImages
    )
      return false;
    return true;
  }

  function condition2() {
    if (
      !organizationName ||
      !organizationDescription ||
      !organizationImages ||
      !organizationAddress ||
      !website ||
      !workTime
    )
      return false;
    return true;
  }

  function sendCard() {
    const formData = new FormData();

    if (condition1()) {
      formData.append("cardName", eventName);
      formData.append("dateTimeStart", startDate);
      formData.append("dateTimeFinish", endDate);
      formData.append("photo1", cardImages[0]);
      formData.append("photo2", cardImages[1]);
      formData.append("photo3", cardImages[2]);
      formData.append("description", eventDescription);
      formData.append("eventAddress", eventAddress);
      formData.append("webSite", organizationData?.webSite || "");
      formData.append("categoryId", String(organizationData?.categoryId));
      formData.append("organizationId", String(organizationData?.id));
      formData.append("toAccept", "true");

      createCard(formData);
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }

  function updateOrganizationFunc() {
    const formData = new FormData();

    if (condition2()) {
      formData.append("name", organizationName);
      formData.append("description", organizationDescription);

      formData.append("photo1", organizationImages[0]);
      formData.append("photo2", organizationImages[1]);
      formData.append("photo3", organizationImages[2]);
      formData.append("photo4", organizationImages[3]);
      formData.append("photo5", organizationImages[4]);
      formData.append("organizationAddress", organizationAddress);
      formData.append("webSite", website);
      formData.append("workTime", workTime);

      updateOrganization(formData);
    }

    setShowMessage2(true);
    setTimeout(() => setShowMessage2(false), 3000);
  }

  return (
    <Container>
      <Rows>
        {organizationData ? (
          <Row>
            {pathname === "/admin/publish-new-card" ? (
              <>
                <Input
                  value={eventName}
                  setValue={(e) => setEventName(e.target.value)}
                  height={40}
                  label="Название события"
                />
                <TextArea
                  value={eventDescription}
                  setValue={(e) => setEventDescription(e.target.value)}
                  comment="Допустимое число символов - 1000"
                  height={89}
                  label="Описание"
                />
                <Input
                  value={startDate}
                  setValue={(e) => setStartDate(e.target.value)}
                  height={40}
                  label="Время начала мероприятия"
                  placeholder="гггг-мм-дд"
                />
                <Input
                  value={endDate}
                  setValue={(e) => setEndDate(e.target.value)}
                  height={40}
                  label="Время окончания мероприятия"
                  placeholder="гггг-мм-дд"
                />
                <Input
                  value={eventAddress}
                  setValue={(e) => setEventAddress(e.target.value)}
                  height={40}
                  label="Адрес"
                />
                <Button onClick={sendCard}>
                  <Text size={16}>Отправить на утверждение</Text>
                </Button>
              </>
            ) : (
              <>
                <Input
                  value={organizationName}
                  setValue={(e) => setOrganizationName(e.target.value)}
                  height={40}
                  label="Название организации"
                />
                <TextArea
                  value={organizationDescription}
                  setValue={(e) => setOrganizationDescription(e.target.value)}
                  comment="Допустимое число символов - 150"
                  height={89}
                  label="Описание"
                />
                <Input
                  value={organizationAddress}
                  setValue={(e) => setOrganizationAddress(e.target.value)}
                  height={35}
                  label="Адрес организации"
                />
                <Input
                  value={workTime}
                  setValue={(e) => setWorkTime(e.target.value)}
                  height={35}
                  label="Время работы"
                  placeholder="пн-пт 8:00-22:00"
                />
                <Input
                  value={website}
                  setValue={(e) => setWebsite(e.target.value)}
                  height={35}
                  label="Веб-сайт организации"
                />
                <Button onClick={updateOrganizationFunc}>
                  <Text size={16}>Сохранить</Text>
                </Button>
                {showMessage2 && <Message>Данные обновлены!</Message>}
              </>
            )}
          </Row>
        ) : (
          <Text>Загрузка...</Text>
        )}
        {pathname === "/admin/update-profile" ? (
          <form>
            <AddImage>
              <UploadFile
                onChange={(e) => checkFile1(e)}
                type="file"
                id="file-input-1"
                multiple
              />
              <Label isImagesLoaded1={isImagesLoaded2} htmlFor="file-input-1">
                Добавить изображение
              </Label>
              <Plus width={15} height={15} />
            </AddImage>
            <Text pt={10} size={10} color="rgba(41, 41, 41, 0.34)">
              {isImagesLoaded2
                ? "Изображения добавлены"
                : "Добавьте минимум одно изображение"}
            </Text>
          </form>
        ) : (
          <form>
            <AddImage>
              <UploadFile
                onChange={(e) => checkFile2(e)}
                type="file"
                id="file-input-2"
                multiple
              />
              <Label isImagesLoaded1={isImagesLoaded1} htmlFor="file-input-2">
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
        )}
      </Rows>
      {showMessage && (
        <Message>
          {condition1() || condition2()
            ? "Карточка отправлена на утверждение"
            : "Заполните поля!"}
        </Message>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1350px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 40px;
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
