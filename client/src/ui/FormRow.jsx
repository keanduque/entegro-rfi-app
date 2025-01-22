import styled from "styled-components";
import { media } from "../styles/MediaQueries";
import { fieldColors } from "../styles/Statuses";

const StyledFormRow = styled.div`
  /* display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;*/
  display: grid;
  align-items: baseline;
  grid-template-columns: 15rem 1fr;
  padding: 0.2rem 1rem;
  gap: 0.5rem;
  ${(props) => fieldColors[props.$fieldColor]}

  select, input, textarea {
    color: var(--color-grey-700);
  }

  &:first-child {
    padding-top: 0;

    @media screen and (max-width: ${media.md}) {
      padding: 0.5rem 1rem;
      border-top: 1px solid var(--color-grey-100);
    }
  }

  &:last-child {
    padding-bottom: 0.5rem;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

StyledFormRow.defaultProps = {
  $fieldColor: "normCol",
};

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
`;

const ErrorContainer = styled.div`
  grid-column: span 2; /* Make the error message span both columns */
  color: red; /* Optional: Add error-specific styling */
  font-size: 0.875rem; /* Optional: Adjust font size */
  margin-top: 0.5rem; /* Add space between field and error */
`;

const Error = styled.span`
  font-size: 1rem;
  color: var(--color-red-700);
  font-weight: 500;
`;

function FormRow({ label, error, fieldColor, children }) {
  return (
    <StyledFormRow $fieldColor={fieldColor}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && (
        <ErrorContainer>
          <Error>{error}</Error>
        </ErrorContainer>
      )}
    </StyledFormRow>
  );
}

export default FormRow;
