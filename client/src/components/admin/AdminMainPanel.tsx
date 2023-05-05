import styled from "styled-components";
import {
  useDeleteAdminsMutation,
  useGetAdminsQuery,
} from "../../store/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Spin, Result, Empty, Table, Button, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

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
        key: "id",
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
        title: "Имя",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Фамилия",
        dataIndex: "surname",
        key: "surname",
        sorter: (a, b) => a.surname.localeCompare(b.surname),
      },
      {
        title: "Действия",
        dataIndex: "action",
        key: "action",
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
      <Content
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </Content>
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
    return (
      <Content
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Empty description={"Список админов пуст..."} />
      </Content>
    );
  }
  return (
    <>
      <Title>Администраторы</Title>
      <Table
        columns={columns}
        dataSource={admins}
        bordered
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />
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
