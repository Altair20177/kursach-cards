import styled from "styled-components";
import TextArea from "../admin/TextArea";
import Text from "../generic/Text";

interface ModalCommentProps {}

export default function ModalComment({}: ModalCommentProps) {
  return (
    <Block>
      <Header>
        <Text align="center" color="black" size={18}>
          Добавьте комментарий
        </Text>
      </Header>
      <Body>
        <TextArea value="sd" setValue={(e) => e} height={251} />
        <Button>Отправить</Button>
      </Body>
    </Block>
  );
}

const Block = styled.div`
  background: #fafafa;
  box-shadow: 17px 15px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding-bottom: 40px;
`;

const Header = styled.header`
  padding: 30px 0 10px;
  border-bottom: 3px solid #004945;
`;

const Body = styled.div`
  padding: 25px 45px 20px;
`;

const Button = styled.div`
  background: #335250;
  border-radius: 20px;
  color: white;
  transition: 0.2s;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px 30px;
  width: fit-content;

  &:hover {
    background: #335250de;
    cursor: pointer;
  }
`;
