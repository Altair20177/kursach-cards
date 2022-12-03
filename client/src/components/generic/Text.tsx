import styled from "styled-components";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: number;
  fw?: 400 | 500 | 600 | 800;
  pb?: number | null;
  pt?: number | null;
  pr?: number | null;
  pl?: number | null;
  mt?: number | null;
  mb?: number | null;
  align?: "center" | "start" | "end";
  bb?: string;
  ls?: number | null;
  underline?: boolean;
  color?: string;
  lh?: number | null;
  width?: number;
}

export default function Text({
  children,
  size = 18,
  fw = 400,
  pb = null,
  pt = null,
  pr = null,
  pl = null,
  align = "start",
  bb = "",
  mt = null,
  mb = null,
  ls = null,
  underline = false,
  color = "",
  lh = null,
  width = 0,
}: TextProps) {
  return (
    <P
      size={size}
      fw={fw}
      pb={pb}
      pt={pt}
      pr={pr}
      pl={pl}
      mt={mt}
      mb={mb}
      align={align}
      bb={bb}
      ls={ls}
      underline={underline}
      color={color}
      lh={lh}
      width={width}
    >
      {children}
    </P>
  );
}

const P = styled.p<TextProps>`
  color: ${(p) => (p.color ? p.color : "white")};
  font-size: ${(p) => p.size}px;
  text-align: ${(p) => p.align};
  font-weight: ${(p) => p.fw};

  ${(p) => p.pt && `padding-top: ${p.pt}px;`}
  ${(p) => p.pb && `padding-bottom: ${p.pb}px;`}
  ${(p) => p.pl && `padding-left: ${p.pl}px;`}
  ${(p) => p.pr && `padding-right: ${p.pr}px;`}
  ${(p) => p.mt && `margin-top: ${p.mt}px;`}
  ${(p) => p.mb && `margin-bottom: ${p.mb}px;`}
  ${(p) => p.bb && `border-bottom: 1px solid ${p.bb};`}
  ${(p) => p.ls && `letter-spacing: ${p.ls}em;`}
  ${(p) => p.lh && `line-height: ${p.lh}px;`}
  ${(p) => p.underline && `text-decoration: underline;`}
  ${(p) => p.width && `width: ${p.width}px;`}
`;
