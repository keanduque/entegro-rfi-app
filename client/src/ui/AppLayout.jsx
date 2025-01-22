import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { media } from "../styles/MediaQueries";
import { useState } from "react";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  @media (max-width: ${media.md}) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseSidebar = (e) => {
    if (sidebarOpen) setSidebarOpen(false);
  };

  return (
    <StyledAppLayout $sidebarOpen={sidebarOpen} onClick={handleCloseSidebar}>
      <Header />
      <Sidebar $isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
