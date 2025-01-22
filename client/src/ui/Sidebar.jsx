import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineMenuOpen } from "react-icons/md";
import { media } from "../styles/MediaQueries";

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
  background-color: var(--color-grey-100);
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

const Overlay = styled.div`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;

  @media (min-width: 768px) {
    display: none;
  }
`;
const SidebarToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  z-index: 1100;

  @media (max-width: ${media.md}) {
    display: block;
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
  }
`;

function Sidebar({ $isOpen, setIsOpen }) {
  return (
    <>
      <SidebarToggle
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!$isOpen);
        }}
      >
        {$isOpen ? <MdOutlineMenuOpen /> : <MdOutlineMenu />}
      </SidebarToggle>
      <Overlay $isOpen={$isOpen} onClick={() => setIsOpen(false)} />
      <StyledSidebar $isOpen={$isOpen}>
        <Logo location="sidebar" />
        <MainNav />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
