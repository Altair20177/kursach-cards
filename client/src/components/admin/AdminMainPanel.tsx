import styled from "styled-components";
import {
  useDeleteAdminsMutation,
  useGetAdminsQuery,
} from "../../store/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import {
  Layout,
  Spin,
  Result,
  Empty,
  Table,
  Button,
  notification,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { DeleteFilled } from "@ant-design/icons";

export default function AdminMainPanel() {
  const {
    data: admins,
    isLoading,
    isError,
    error,
  } = useGetAdminsQuery(undefined);
  const [fetchAdminDelete] = useDeleteAdminsMutation();
  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        key: 1,
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: 2,
        sorter: (a, b) => a.email - b.email,
      },
      {
        title: "Имя",
        dataIndex: "name",
        key: 3,
        sorter: (a, b) => a.name - b.name,
      },
      {
        title: "Фамилия",
        dataIndex: "surname",
        key: 4,
        sorter: (a, b) => a.surname - b.surname,
      },
      {
        title: "Действия",
        dataIndex: "action",
        key: 5,
        render: (_, record) => (
          <Button
            icon={<DeleteFilled />}
            onClick={() =>
              fetchAdminDelete(record.id).then(() => {
                notification.success({
                  message: "Администратор удален",
                });
              })
            }
          >
            Удалить
          </Button>
        ),
      },
    ],
    [fetchAdminDelete]
  );
  if (isLoading) {
    return (
      <Layout
        style={{
          background: "transparent",
          height: "auto",
        }}
      >
        <Spin />
      </Layout>
    );
  }
  if (isError) {
    return (
      <Result
        status="error"
        title={"Ошибка при загрузке администраторов"}
        subTitle="Перед повторной отправкой проверьте и измените следующую информацию."
      >
        Причина: {(error as FetchBaseQueryError)?.status}
      </Result>
    );
  }
  if (!admins?.length) {
    return <Empty description={"Список админов пуст"} />;
  }
  return (
    <>
      <Title>Администраторы</Title>
      <Table
        columns={columns}
        dataSource={admins}
        bordered
        pagination={{ pageSize: 10 }}
      />
      {/* <Table>
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
        {admins?.map((admin) => {
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
      </Table> */}
    </>
  );
}

// const Table = styled.div`
//   width: 100%;
//   margin: 50px auto 265px;
// `;

const Title = styled.p`
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 20px;
  color: rgba(41, 41, 41, 0.62);
`;
