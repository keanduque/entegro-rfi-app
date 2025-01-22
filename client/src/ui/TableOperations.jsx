import styled from "styled-components";
import { media } from "../styles/MediaQueries";

const TableOperations = styled.div`
  display: flex;
  /* grid-template-columns: 3fr 1fr; */
  align-items: start;
  gap: 1.6rem;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (min-width: ${media.lg}) and (max-width: 1143px) {
    flex-wrap: nowrap;
  }
`;

export default TableOperations;
