import styled, { css } from "styled-components";
import { media } from "../styles/MediaQueries";

export const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  /* grid-template-rows: 1fr;
  grid-auto-rows: 50px;
  border: solid 1px #00f; */

  ${(props) =>
    props.type === "assessment-form" &&
    css`
      textarea {
        height: 14.1rem;
      }
    `}

  ${(props) => props.type === "common-form" && css``}

  @media screen and (max-width: ${media.md}) {
    display: block;
  }
`;

export const StyledCols = styled.div`
  display: grid;
  align-content: flex-start;
`;

export const StyledColControl = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0;
  margin-top: 1rem;
  background-color: var(--color-grey-200);
  border-radius: 10px;

  &:last-child {
    padding-bottom: 0;
  }
`;

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      display: grid;
      grid-column: span 2;
      /* padding: 1rem 0;
      border-top: 1px solid var(--color-grey-100);
      font-size: 1.2rem;
      background-color: var(--color-grey-0); */
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      /* width: 80rem; */
      width: 100%;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
