import styled from "styled-components";
import { media } from "../styles/MediaQueries";
import { HiOutlineSearch } from "react-icons/hi";

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  @media screen and (min-width: ${media.md}) {
    width: 250px;
  }
  @media screen and (max-width: ${media.lg}) {
    width: 100%;
  }
`;

export const SearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: var(--color-grey-400);
  font-size: 1.4rem;
`;

export const SearchInput = styled.input`
  font-size: 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 30px;
  background-color: var(--color-grey-50);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  @media screen and (min-width: ${media.lg}) {
    width: 250px;
  }
`;
