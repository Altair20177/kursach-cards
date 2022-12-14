import styled from "styled-components";
import Text from "../generic/Text";

type TermsType = {
  name: string;
};

const terms: TermsType[] = [
  {
    name: "© Copyright 2015 - 2022",
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
            <Text key={term.name} color="#FAFAFA" lh={33} size={12}>
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
`;

const Content = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 30px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
