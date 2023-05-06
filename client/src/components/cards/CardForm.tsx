import { FC, useMemo } from "react";
import { CardType } from "../../types";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  notification,
  Input,
  Alert,
  Upload,
  Button,
  Form as AntdForm,
  Space,
  DatePicker,
  Switch,
  Select,
} from "antd";
import { Formik, Form } from "formik";
import { useUpdateCardMutation } from "../../store/cardApi";
import dayjs from "dayjs";
import { useGetCategoriesQuery } from "../../store/categoryApi";
import { useAppSelector } from "../../store/hooks";
import { getUserRole } from "../../store/userSlice";
import CardDetails from "./CardDetails";
import { useLocation } from "react-router-dom";
import { createCard } from "../../http/cardApi";

const { RangePicker } = DatePicker;

interface CardFormProps {
  card: CardType;
}

const CardForm: FC<CardFormProps> = ({ card }) => {
  const [fetchUpdatecard] = useUpdateCardMutation();
  const { data: categories } = useGetCategoriesQuery(undefined);
  const userRole = useAppSelector(getUserRole);
  const location = useLocation();
  const isCreateCard = useMemo(
    () => location.pathname !== "/publish-new-card",
    [location.pathname]
  );
  const changeEventDate =
    (values: any, setValues: any) =>
    (_: any, dateString: [string, string] | string) => {
      setValues({
        ...values,
        dateTimeStart: dateString[0],
        dateTimeFinish: dateString[1],
      });
    };
  if (!(userRole === "superAdmin" || userRole === "admin")) {
    return <CardDetails card={card} />;
  }
  if (isCreateCard && card?.toAccept) {
    notification.info({
      message: "Внимание! Данная карточка пока не одобрена администратором",
    });
  }
  return (
    <Formik
      initialValues={card}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        Object.entries(values).forEach((entity) => {
          const [key, value] = entity;
          formData.append(key, value as any);
        });
        formData.set("toAccept", "true");
        formData.delete("id");
        if (isCreateCard) {
          createCard(formData).then((res) => {
            setSubmitting(false);
            if ("error" in res) {
              notification.error({
                message: (res.error as any)?.data?.message,
              });
              return;
            }
            notification.success({
              message: "Карточка успешно добавлена!",
            });
          });
          return;
        }
        fetchUpdatecard({
          id: card.id,
          card: formData as unknown as CardType,
        }).then((res) => {
          setSubmitting(false);
          if ("error" in res) {
            notification.error({
              message: (res.error as any)?.data?.message,
            });
            return;
          }
          notification.success({
            message: "Карточка успешно обновлена!",
          });
        });
      }}
      validate={(values) => {
        const errors: any = {};
        Object.entries(values).forEach((entity) => {
          const [key, value] = entity;
          if (
            ![
              "id",
              "categoryId",
              "isFree",
              "photo1",
              "photo2",
              "photo3",
              "toAccept",
              "price",
            ].includes(key)
          ) {
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
        setFieldValue,
        isValid,
        isSubmitting,
      }) => (
        <Form>
          <AntdForm.Item label="Название">
            <Input
              placeholder="Введите название"
              name="cardName"
              value={values.cardName || ""}
              onChange={handleChange}
            />
          </AntdForm.Item>
          {touched.cardName && errors.cardName ? (
            <Alert
              type="error"
              message={errors.cardName}
              banner
              style={{
                marginBottom: 20,
              }}
            />
          ) : null}
          <AntdForm.Item label="Описание">
            <Input.TextArea
              rows={4}
              placeholder="Введите описание новости"
              name="description"
              value={values.description || ""}
              onChange={handleChange}
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
          <Space
            direction="vertical"
            size={12}
            style={{
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "row",
                columnGap: 10,
              }}
            >
              <span>Время начала мероприятия</span>
              <span>Время окончания мероприятия</span>
            </div>
            <RangePicker
              value={[
                !!values.dateTimeStart
                  ? dayjs(values.dateTimeStart, "YYYY-MM-DD HH:mm")
                  : null,
                !!values.dateTimeFinish
                  ? dayjs(values.dateTimeFinish, "YYYY-MM-DD HH:mm")
                  : null,
              ]}
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              onChange={changeEventDate(values, setValues)}
              style={{
                width: "100%",
              }}
            />
          </Space>
          <AntdForm.Item label="Адрес">
            <Input
              placeholder="Введите адрес"
              name="eventAddress"
              value={values.eventAddress || ""}
              onChange={handleChange}
            />
          </AntdForm.Item>
          {touched.eventAddress && errors.eventAddress ? (
            <Alert
              type="error"
              message={errors.eventAddress}
              banner
              style={{
                marginBottom: 20,
              }}
            />
          ) : null}
          <AntdForm.Item label="Веб-сайт">
            <Input
              placeholder="Введите веб-сайт"
              name="webSite"
              value={values.webSite || ""}
              onChange={handleChange}
            />
          </AntdForm.Item>
          {touched.webSite && errors.webSite ? (
            <Alert
              type="error"
              message={errors.webSite}
              banner
              style={{
                marginBottom: 20,
              }}
            />
          ) : null}
          <AntdForm.Item label="Категория">
            <Select
              showSearch
              style={{ width: 200 }}
              clearIcon
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[...categories!].map((category) => ({
                value: category.id.toString(),
                label: category.categoryName,
              }))}
              defaultValue={
                categories?.find(
                  (category) => category.id === values.categoryId
                )?.categoryName
              }
              onChange={(e) => {
                setFieldValue("categoryId", e);
              }}
            />
          </AntdForm.Item>
          <AntdForm.Item label="Вход бесплатный">
            <Switch
              checked={values.isFree}
              onChange={(e) => {
                if (!!e) {
                  setFieldValue("price", 0);
                }
                setFieldValue("isFree", e);
              }}
            />
          </AntdForm.Item>
          {!values.isFree ? (
            <AntdForm.Item label="Цена">
              <Input
                type="number"
                placeholder="Введите цену"
                name="price"
                value={values.price || ""}
                onChange={handleChange}
              />
            </AntdForm.Item>
          ) : null}
          <AntdForm.Item label="Картинка">
            <Upload
              beforeUpload={() => false}
              onChange={(files) => {
                setValues((prev: any) => {
                  console.log(prev);
                  const newCard = { ...prev };
                  files.fileList.forEach((file, idx) => {
                    newCard[`photo${idx + 1}`] = file.originFileObj;
                  });
                  return newCard;
                });
              }}
              maxCount={3}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Загрузить картинку</Button>
            </Upload>
          </AntdForm.Item>
          <AntdForm.Item>
            <Button
              icon={isSubmitting ? <LoadingOutlined /> : null}
              type="primary"
              htmlType="submit"
              danger={!isValid}
            >
              {isCreateCard ? "Добавить" : "Отправить на редактирование"}
            </Button>
          </AntdForm.Item>
        </Form>
      )}
    </Formik>
  );
};

export default CardForm;
