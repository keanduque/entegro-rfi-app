import styled from "styled-components";
import { media } from "../styles/MediaQueries";

const StyledLogo = styled.div`
  text-align: left;
  display: ${(props) => (props.$location === "header" ? "none" : "flex")};

  @media screen and (max-width: ${media.md}) {
    display: ${(props) => (props.$location === "sidebar" ? "none" : "flex")};
  }
`;

const Img = styled.img`
  height: 5rem;
  width: auto;
`;

const HrDivider = styled.hr`
  margin: 0px 10px;
  flex-shrink: 0;
  border-width: 0px thin 0px 0px;
  border-style: solid;
  border-color: rgba(110, 109, 109, 0.12);
  height: auto;
  align-self: stretch;
`;

// const TitleHub = styled.h1`
//   font-weight: 500;
//   font-size: 1.25rem;
//   line-height: 1.6;
//   -webkit-box-flex: 1;
//   flex-grow: 1;
//   align-self: center;
// `;

function Logo({ location }) {
  return (
    <StyledLogo $location={location}>
      <Img src="/ENTEGRO-LOGO-RGB-2.png" alt="Logo" />
      <HrDivider />
      <Img src="/nbi-logo.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
