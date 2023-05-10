import { Image, Card } from "antd";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/url";
import { FC } from "react";
import { INews } from "../../types";
import { DeleteOutlined } from "@ant-design/icons";

interface NewsItemProps {
  newItem: INews;
  removeNews: (id: number) => void;
  canRemove: boolean;
}

const NewsItem: FC<NewsItemProps> = ({ newItem, removeNews, canRemove }) => {
  const { id, name, description, image } = newItem;
  return (
    <Card
      extra={<Link to={`/news/${id}`}>Подробнее</Link>}
      hoverable
      style={{ width: 240, wordWrap: "break-word" }}
      key={id}
      actions={[
        canRemove ? (
          <DeleteOutlined onClick={() => removeNews(id)} key="delete" />
        ) : null,
      ]}
    >
      <Image
        width={"100%"}
        height={180}
        src={getImageUrl(image as string)}
        style={{
          borderRadius: 8,
        }}
      />
      <Card title={name} bordered={false}>
        {description}
      </Card>
    </Card>
  );
};

export default NewsItem;
