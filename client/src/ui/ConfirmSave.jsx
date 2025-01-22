import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmSave({ fieldName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Save {fieldName}</Heading>
      <p>Click Yes to Save or No to Discard Changes</p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          No
        </Button>
        <Button $variation="success" disabled={disabled} onClick={onConfirm}>
          Yes
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmSave;
