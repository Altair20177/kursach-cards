import styled from "styled-components";
import { CardType } from "../../types";

interface OneCardProps {
  cardAbout: CardType;
}

export default function OneCard({ cardAbout }: OneCardProps) {
  return <Block>{cardAbout.name}</Block>;
}

const Block = styled.div`
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 289px;
  height: 369px;
`;
