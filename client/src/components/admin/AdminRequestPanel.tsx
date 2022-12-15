import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  acceptRequestToAdmin,
  fetchRequestToAdmin,
  rejectRequestToAdmin,
} from "../../http/userAPI";
import Message from "../generic/Message";
import Text from "../generic/Text";

type RequestType = {
  id: number;
  organizationName: string;
  address: string;
  userEmail: string;
  category: string;
};

export default function AdminRequestPanel() {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetchRequestToAdmin().then((data) => setRequests(data));
  }, []);

  function acceptRequest(requestId: number) {
    acceptRequestToAdmin(requestId);
    setStatus("Заявка принята");
    setRequests(requests.filter((request) => request.id !== requestId));

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }

  function rejectRequest(requestId: number) {
    rejectRequestToAdmin(requestId);
    setStatus("Заявка отклонена");
    setRequests(requests.filter((request) => request.id !== requestId));

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }

  return (
    <>
      <Title>Заявки</Title>
      {requests.length !== 0 ? (
        <Table>
          <Row>
            <Text align="center" color="black">
              Название организации
            </Text>
            <Text align="center" color="black">
              Адрес
            </Text>
            <Text align="center" color="black">
              Email пользователя
            </Text>
            <Text align="center" color="black">
              Категория
            </Text>
            <Text align="center" color="black">
              Действие
            </Text>
            <Text align="center" color="black">
              Действие
            </Text>
          </Row>
          {requests.map((request, index) => {
            return (
              <Row key={request.id}>
                <Text align="center" color="black">
                  {request.organizationName}
                </Text>
                <Text align="center" color="black">
                  {request.address}
                </Text>
                <Text align="center" color="black">
                  {request.userEmail}
                </Text>
                <Text align="center" color="black">
                  {request.category}
                </Text>
                <Button onClick={() => acceptRequest(request.id)}>
                  Подтвердить
                </Button>
                <Button onClick={() => rejectRequest(request.id)}>
                  Отклонить
                </Button>
              </Row>
            );
          })}
        </Table>
      ) : (
        <Text align="center" pt={100} pb={300} size={40} color="black">
          Заявок нет!
        </Text>
      )}
      {showMessage && <Message>{status}</Message>}
    </>
  );
}

const Table = styled.div`
  width: 100%;
  margin: 20px auto 294px;
`;

const Title = styled.p`
  margin-top: 50px;
  font-size: 20px;
  color: rgba(41, 41, 41, 0.62);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 6fr);
  border-bottom: 1px solid black;
  height: 60px;
  align-items: center;
`;

const Button = styled.button`
  background: #335250;
  border-radius: 20px;
  width: 150px;
  padding: 15px 0;
  color: white;
  margin: 0 auto;
`;
