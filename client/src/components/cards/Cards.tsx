import styled from "styled-components";
import CardList from "./CardList";

export default function Cards() {
  return (
    <Container>
      <CardList />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1350px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 110px;
`;
