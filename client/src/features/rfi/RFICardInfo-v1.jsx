import { IoWarning } from "react-icons/io5";
import styled from "styled-components";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export function RFICardInfo({ label, rfi_field }) {
  return (
    <>
      <p>
        <strong>{label}</strong>
        {rfi_field !== null ? (
          rfi_field
        ) : (
          <>
            <IoWarning />
            <span>Not set</span>
          </>
        )}
      </p>
    </>
  );
}
