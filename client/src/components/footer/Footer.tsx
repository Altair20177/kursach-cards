import styled from "styled-components";
import Text from "../generic/Text";

type TermsType = {
  name: string;
};

const terms: TermsType[] = [
  {
    name: "© Copyright 2015 - 2020",
  },
  {
    name: "ALL RIGHTS RESERVED",
  },
  {
    name: "TERMS AND CONDITIONS",
  },
];

export default function Footer() {
  return (
    <Block>
      <Content>
        <Row>
          {terms.map((term: TermsType) => (
            <Text key={term.name} color="#FAFAFA" lh={33} size={14}>
              {term.name}
            </Text>
          ))}
        </Row>
      </Content>
    </Block>
  );
}

const Block = styled.footer`
  background-color: #004945;
  margin-top: 100px;
`;

const Content = styled.div`
  max-width: 575px;
  margin: 0 auto;
  padding: 50px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
