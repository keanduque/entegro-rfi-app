import styled from "styled-components";
import Logo from "./Logo";

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
  padding: 1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  height: 7rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 3.5;
  align-self: center;
  display: flex;
  gap: 10px;
`;

function Header() {
  return (
    <StyledHeader>
      <Logo location="header" />
      Entegro RFI Tracker
    </StyledHeader>
  );
}

export default Header;
