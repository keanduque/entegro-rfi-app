import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useState } from "react";

// const StyledSidebar = styled.aside`
//   background-color: var(--color-grey-0);
//   padding: 1.5rem 2.4rem;
//   border-right: 1px solid var(--color-grey-100);
//   grid-row: 1 / -1;
//   display: flex;
//   gap: 2rem;
//   flex-direction: column;
//   height: 100vh;
// `;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 1.5rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  height: 100vh;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
  position: fixed;
  z-index: 1000;

  @media (min-width: 768px) {
    transform: translateX(0);
    position: relative;
  }
`;

const SidebarToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  z-index: 1100;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
  }
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SidebarToggle onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </SidebarToggle>
      <StyledSidebar $isOpen={isOpen}>
        <Logo />
        <MainNav />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
