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
import { useUpdateNewsMutation } from "../../store/newsApi";
import { useAppSelector } from "../../store/hooks";
import { getUserRole } from "../../store/userSlice";
import { RcFile } from "antd/es/upload";

interface NewsFormProps {
  news: INews;
}

const NewsForm: FC<NewsFormProps> = ({ news }) => {
  const [fetchUpdateNews] = useUpdateNewsMutation();
  const userRole = useAppSelector(getUserRole);
  const canEdit = useMemo(() => userRole === "superAdmin", [userRole]);
  return (
    <Formik
      initialValues={news}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("image", values.image);
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
        if (!values.name) {
          errors["name"] = "Обязательное поле";
        }
        if (!values.description) {
          errors["description"] = "Обязательное поле";
        }
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
        <Form>
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
            </>
          ) : (
            <Image
              src={getImageUrl(values.image as string)}
              width={"100%"}
              height={400}
            />
          )}
          <AntdForm.Item>
            {canEdit ? (
              <Button
                icon={isSubmitting ? <LoadingOutlined /> : null}
                type="primary"
                htmlType="submit"
                danger={!isValid}
              >
                Отправить на редактирование
              </Button>
            ) : null}
          </AntdForm.Item>
        </Form>
      )}
    </Formik>
  );
};

export default NewsForm;
