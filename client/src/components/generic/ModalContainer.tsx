import styled, { css } from "styled-components";

interface ModalConteinerProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  isOpen: boolean;
  setIsRequestToAdmin?: (flag: boolean) => void;
  setIsOpen: (flag: boolean) => void;
  setIsAuth?: (flag: boolean) => void;
}

export default function ModalContainer({
  children,
  isOpen,
  setIsOpen,
  setIsRequestToAdmin,
  setIsAuth,
}: ModalConteinerProps) {
  function closeModal() {
    setIsRequestToAdmin && setIsRequestToAdmin(false);
    setIsOpen(false);
    setIsAuth && setIsAuth(true);
  }
  return (
    <Outer onClick={closeModal} isOpen={isOpen}>
      <Inner onClick={(e) => e.stopPropagation()} isOpen={isOpen}>
        {children}
      </Inner>
    </Outer>
  );
}

const Outer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: linear 0.2s;
  visibility: hidden;
  opacity: 0;
  z-index: 10;

  ${(p) =>
    p.isOpen &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

const Inner = styled.div<{ isOpen: boolean }>`
  width: 500px;
  background-color: white;
  border-radius: 15px;
  margin: 0 auto;
  margin-top: 100px;
  transition: linear 0.2s;
  visibility: hidden;
  opacity: 0;

  ${(p) =>
    p.isOpen &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;
