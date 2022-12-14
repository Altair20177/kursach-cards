import styled from "styled-components";
import Text from "../generic/Text";

interface InputProps {
  label: string;
  height: number;
  value: string;
  setValue: (e: any) => void;
  placeholder?: string;
}

export default function Input({
  label,
  height,
  value,
  setValue,
  placeholder,
}: InputProps) {
  return (
    <>
      <Text color="#292929" pb={10} size={16}>
        {label}
      </Text>
      <InputLayout
        placeholder={placeholder || ""}
        value={value}
        onChange={setValue}
        height={height}
      />
    </>
  );
}

const InputLayout = styled.input<{ height: number }>`
  width: 100%;
  height: ${(p) => p.height}px;
  background: #ffffff;
  border: 1px solid rgba(53, 53, 53, 0.6);
  border-radius: 20px;
  font-size: 20px;
  padding: 0 15px;
  margin-bottom: 25px;
`;
