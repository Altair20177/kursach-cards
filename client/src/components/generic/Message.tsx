import styled from "styled-components";
import Text from "./Text";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Message({ children }: MessageProps) {
  return (
    <Wrapper>
      <Inner>
        <Text color="black">{children}</Text>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 70px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  z-index: 100;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`;
