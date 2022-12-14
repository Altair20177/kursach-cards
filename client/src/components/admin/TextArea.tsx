import styled from "styled-components";
import Text from "../generic/Text";

interface TextAreaProps {
  label?: string;
  height: number;
  comment?: string;
  value: string;
  setValue: (e: any) => void;
}

export default function TextArea({ label, height, comment, value, setValue }: TextAreaProps) {
  return (
    <>
      <Text color="#292929" pb={10} size={16}>
        {label}
      </Text>
      <TextAreaLayout value={value} onChange={setValue} height={height} />
      {comment && (
        <Text mb={20} size={10} pt={8} color="rgba(41, 41, 41, 0.34)">
          {comment}
        </Text>
      )}
    </>
  );
}

const TextAreaLayout = styled.textarea<{ height: number }>`
  width: 100%;
  height: ${(p) => p.height}px;
  background: #ffffff;
  border: 1px solid rgba(53, 53, 53, 0.6);
  border-radius: 20px;
  font-size: 20px;
  padding: 10px 15px;
  resize: none;
`;
