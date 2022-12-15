import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAdmins } from "../../http/userAPI";
import Text from "../generic/Text";

type AdminType = {
  id: number;
  email: string;
  name: string;
  surname: string;
};

export default function AdminMainPanel() {
  const [admins, setAdmins] = useState<AdminType[]>([]);

  useEffect(() => {
    fetchAdmins().then((data) => setAdmins(data));
  }, []);

  return (
    <>
      <Title>Администраторы</Title>
      {admins.length !== 0 ? (
        <Table>
          <Row>
            <Text align="center" color="black">
              ID
            </Text>
            <Text align="center" color="black">
              Email
            </Text>
            <Text align="center" color="black">
              Имя
            </Text>
            <Text align="center" color="black">
              Фамилия
            </Text>
          </Row>
          {admins.map((admin) => {
            return (
              <Row key={admin.email}>
                <Text align="center" color="black">
                  {admin.id}
                </Text>
                <Text align="center" color="black">
                  {admin.email}
                </Text>
                <Text align="center" color="black">
                  {admin.name}
                </Text>
                <Text align="center" color="black">
                  {admin.surname}
                </Text>
              </Row>
            );
          })}
        </Table>
      ) : (
        <Text pt={30} size={40} color="black">
          Администраторов нет!
        </Text>
      )}
    </>
  );
}

const Table = styled.div`
  width: 100%;
  margin: 50px auto 265px;
`;

const Title = styled.p`
  margin-top: 50px;
  font-size: 20px;
  color: rgba(41, 41, 41, 0.62);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  border-bottom: 1px solid black;
  height: 60px;
  align-items: center;
`;
