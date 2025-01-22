import { MdDeleteOutline, MdOutlineEditNote } from "react-icons/md";
import { wayleaveStatus } from "../../styles/Statuses";
import { formatDateHHmmss } from "../../utils/helpers";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateRFIWayleaveForm from "./CreateRFIWayleaveForm";
import { useDeleteWayleave } from "./useDeleteWayleave";
import { useCreateWayleave } from "./useCreateWayleave";
import { IoDuplicateOutline } from "react-icons/io5";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.4fr 0.3fr 0.5fr 0.12fr;
  padding: 0.3rem 1rem;
  gap: 0.5rem;

  align-items: flex-start;
  background-color: var(--color-grey-0);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const Col = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-grey-700);
  height: -webkit-fill-available;

  overflow: ${(props) => (props.$truncate ? "hidden" : "visible")};
  white-space: ${(props) => (props.$truncate ? "nowrap" : "normal")};
  text-overflow: ${(props) => (props.$truncate ? "ellipsis" : "clip")};
`;

Col.defaultProps = {
  $colType: "normal",
  $truncate: false,
};

// Define the styled `Col` component for `wayleave_status`
const StatusCol = styled.div`
  color: ${({ $status }) =>
    $status === "Yellow" || $status === "Leaflet Drop"
      ? "black"
      : "white"}; /* Contrast adjustment */
  background-color: ${({ $status }) => wayleaveStatus($status)};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  display: grid;
  align-items: center;
  height: -webkit-fill-available;
`;

export const BtnControl = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.5fr);
  gap: 5px;
  width: 100%;
  align-items: center;
  /* height: -webkit-fill-available; */
  border-left: solid 1px var(--color-grey-300);
  padding-left: 5px;

  div {
    // div for buttons
    display: flex;
    gap: 10px;
    grid-column: 2 / span 1;
    width: 100%;
    flex-direction: row-reverse;
    align-items: flex-start;
  }

  a {
    svg {
      font-size: 2rem;
      color: var(--color-nbi-color);
    }
  }
  button:focus {
    outline: none;
  }
  button:has(svg) {
    font-size: 2rem;
    color: var(--color-nbi-color);
    line-height: 0;
    border: none;
    background: none;
    outline: none;
  }
`;

function WayleaveRow({ wayleave }) {
  const { isDeleting, deleteWayleave } = useDeleteWayleave();
  const { isCreating, addWayleave } = useCreateWayleave();

  const {
    id,
    rfi_reference,
    da,
    olt,
    date_submitted,
    layer,
    label,
    wayleave_status,
    remarks,
  } = wayleave;

  function handleDuplicate() {
    addWayleave({
      rfi_reference,
      da,
      olt,
      date_submitted: new Date().toISOString(),
      layer,
      label,
      wayleave_status,
      remarks: `Copy of ${id} : ${remarks}`,
    });
  }

  return (
    <TableRow role="row">
      <Col>{id}</Col>
      <Col>{rfi_reference}</Col>
      <Col>{da}</Col>
      <Col>{olt}</Col>
      <Col>{formatDateHHmmss(date_submitted)}</Col>
      <Col $truncate>{layer}</Col>
      <StatusCol $status={wayleave_status}>{wayleave_status}</StatusCol>
      <Col $truncate>{label}</Col>
      <Col>{remarks}</Col>
      <BtnControl type="card-stack-r-btn">
        <Modal>
          {
            <Modal.Open opens="edit">
              <button title="Edit Wayleave">
                <MdOutlineEditNote />
              </button>
            </Modal.Open>
          }
          <Modal.Window name="edit">
            <CreateRFIWayleaveForm wayleaveToEdit={wayleave} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button title="Delete Wayleave">
              <MdDeleteOutline />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              fieldName={`Wayleave ${id}?`}
              disabled={isDeleting}
              onConfirm={() => deleteWayleave(id)}
            />
          </Modal.Window>
        </Modal>
        {/* // BEGIN DUPLICATE BUTTON DONT DELETE */}
        <button
          disabled={isCreating}
          onClick={handleDuplicate}
          title="Duplicate Wayleave"
        >
          <IoDuplicateOutline />
        </button>
        {/* END DUPLICATE BUTTON DONT DELETE*/}
      </BtnControl>
    </TableRow>
  );
}

export default WayleaveRow;
