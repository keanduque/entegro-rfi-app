import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { media } from "../styles/MediaQueries";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  width: 90%;
  max-width: 500px;
  transition: all 0.5s;
  display: flex;
  flex-direction: column; /* Ensure fixed header and scrollable content */

  @media (min-width: ${media.md}) {
    padding: 2rem 3rem;
    max-width: max-content;
    width: 90%;
  }
  /* @media (min-width: ${media.lg}) {
    max-width: ${media.lg};
  } */
  @media (max-width: ${media.md}) {
    transform: translate(-50%, -40%);
  }
  @media (max-width: ${media.sm}) {
    transform: translate(-50%, -33%);
  }
`;

export const ModalContent = styled.div`
  overflow-y: auto;
  max-height: 70vh; /* Adjust as needed */
  margin-top: 1rem; /* Spacing between header and content */
  padding-right: 0.8rem; /* Add padding to avoid scrollbar overlap */

  /* Scrollbar styling */

  scrollbar-color: var(--color-primary-light) var(--color-grey-100); /* For Firefox */

  &::-webkit-scrollbar {
    width: 10px; /* Scrollbar width */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(
      --color-entegro-900
    ); /* Gradient color for the thumb */
    border-radius: 20px; /* Add curve to the thumb */
    border: 2px solid var(--color-grey-100); /* Border for better visibility */
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-grey-100); /* Scrollbar track color */
    border-radius: 10px; /* Rounded corners for the track */
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1); /* Optional subtle shadow for depth */
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  overflow: auto; /* Enable scroll if needed */
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }

  @media (max-width: 768px) {
    top: 0.8rem;
    right: 1.2rem;
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const ModalContext = createContext(); // compond component 1

// parent component 2
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// child component 3
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref} $modalType="table_modal">
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// add child component 4
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
