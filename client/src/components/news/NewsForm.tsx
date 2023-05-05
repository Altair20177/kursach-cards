import { FC, useMemo } from "react";
import { INews } from "../../types";
import {
  Button,
  Input,
  Form as AntdForm,
  Upload,
  Alert,
  notification,
  Image,
} from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import { getImageUrl } from "../../utils/url";
import {
  useCreateNewsMutation,
  useUpdateNewsMutation,
} from "../../store/newsApi";
import { useAppSelector } from "../../store/hooks";
import { getUserRole } from "../../store/userSlice";
import { RcFile } from "antd/es/upload";
import { useLocation } from "react-router-dom";

interface NewsFormProps {
  news: INews;
}

const NewsForm: FC<NewsFormProps> = ({ news }) => {
  const location = useLocation();
  const [fetchUpdateNews] = useUpdateNewsMutation();
  const [fetchCreateNews] = useCreateNewsMutation();
  const userRole = useAppSelector(getUserRole);
  const canEdit = useMemo(() => userRole === "superAdmin", [userRole]);
  const isCreateForm = useMemo(
    () => location.pathname === "/news/create",
    [location.pathname]
  );
  return (
    <Formik
      initialValues={news}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        Object.entries(values).forEach((entity) => {
          const [key, value] = entity;
          formData.append(key, value as any);
        });
        if (isCreateForm) {
          fetchCreateNews(formData as unknown as INews).then((res) => {
            setSubmitting(false);
            if ("error" in res) {
              notification.error({
                message: (res.error as any)?.data?.message,
              });
              return;
            }
            notification.success({
              message: "Новость успешно добавлена!",
            });
          });
          return;
        }
        fetchUpdateNews({
          id: news.id,
          news: formData as unknown as INews,
        }).then((res) => {
          setSubmitting(false);
          if ("error" in res) {
            notification.error({
              message: (res.error as any)?.data?.message,
            });
            return;
          }
          notification.success({
            message: "Новость успешно обновлена!",
          });
        });
      }}
      validate={(values) => {
        const errors: any = {};
        Object.entries(values).forEach((entity) => {
          const [key, value] = entity;
          if (!["id", "createdAt", "updatedAt"].includes(key)) {
            if (!value) {
              errors[key] = "Обязательное поле";
            }
          }
        });
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setValues,
        isValid,
        isSubmitting,
      }) => (
        <Form
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.6)",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <AntdForm.Item label="Название новости" rules={[{ required: true }]}>
            <Input
              placeholder="Введите название новости"
              name="name"
              value={values.name || ""}
              onChange={handleChange}
              disabled={!canEdit}
            />
          </AntdForm.Item>
          {touched.name && errors.name ? (
            <Alert
              type="error"
              message={errors.name}
              banner
              style={{
                marginBottom: 20,
              }}
            />
          ) : null}
          <AntdForm.Item label="Описание новости" rules={[{ required: true }]}>
            <Input.TextArea
              rows={4}
              placeholder="Введите описание новости"
              name="description"
              value={values.description || ""}
              onChange={handleChange}
              disabled={!canEdit}
            />
          </AntdForm.Item>
          {touched.description && errors.description ? (
            <Alert
              type="error"
              message={errors.description}
              banner
              style={{
                marginBottom: 20,
              }}
            />
          ) : null}
          {canEdit ? (
            <>
              {!!values.image ? (
                <Alert
                  message={`У вас уже есть картинка: `}
                  action={
                    <a
                      href={getImageUrl(values.image as string)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {getImageUrl(
                        typeof values.image === "string"
                          ? values.image
                          : (values.image as RcFile).name
                      )}
                    </a>
                  }
                  type="success"
                  style={{ marginBottom: 20 }}
                />
              ) : null}
              <AntdForm.Item label="Картинка">
                <Upload
                  beforeUpload={() => false}
                  onChange={(files) => {
                    setValues({
                      ...values,
                      image: files.fileList[0].originFileObj!,
                    });
                  }}
                  maxCount={1}
                  disabled={!canEdit}
                >
                  <Button icon={<UploadOutlined />}>Загрузить картинку</Button>
                </Upload>
              </AntdForm.Item>
              {touched.image && errors.image ? (
                <Alert
                  type="error"
                  message={errors.image}
                  banner
                  style={{
                    marginBottom: 20,
                  }}
                />
              ) : null}
            </>
          ) : (
            <Image
              src={getImageUrl(values.image as string)}
              width={"100%"}
              height={400}
            />
          )}
          <AntdForm.Item style={{ display: "flex", justifyContent: "center" }}>
            {canEdit ? (
              <Button
                icon={isSubmitting ? <LoadingOutlined /> : null}
                type="primary"
                htmlType="submit"
                danger={!isValid}
              >
                {isCreateForm ? "Сохранить" : "Отправить на редактирование"}
              </Button>
            ) : null}
          </AntdForm.Item>
        </Form>
      )}
    </Formik>
  );
};

export default NewsForm;
