import styled, { css } from "styled-components";
import { getColorStatus, priorities } from "../../styles/Statuses";

import { MdOutlineAssignment } from "react-icons/md";
import { TfiMapAlt } from "react-icons/tfi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiSurveyLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { IoDuplicateOutline } from "react-icons/io5";

import { RFIBtn } from "./RFIBtn";
import { RFICardInfo } from "./RFICardInfo";
import { formatDate } from "../../utils/helpers";
import CreateRFIForm from "./CreateRFIForm";
import { useDeleteRFI } from "./useDeleteRFI";
import { useCreateRFI } from "./useCreateRFI";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const RFICard = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  height: auto;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-left: 6px solid ${({ $status }) => getColorStatus($status)};
  gap: 10px;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }
`;

const RFICardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${(props) =>
    props.type === "card-container-left" &&
    css`
      align-items: flex-start;
    `}

  ${(props) =>
    props.type === "card-container-right" &&
    css`
      align-items: flex-end;
    `}
`;

const RFICardStackContent = styled.div`
  width: 100%;
  ${(props) =>
    props.type === "card-stack" &&
    css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: 15px;
    `}

  div {
    ${(props) =>
      props.type === "card-stack-full" &&
      css`
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        display: grid;
        font-size: 1rem;
        gap: 10px;

        @media screen and (max-width: 800px) {
          gap: 20px;
        }
      `}
  }
  p {
    font-size: 1.1rem;
    font-weight: 500;

    strong {
      display: block;
      font-weight: 600;
      color: var(--color-grey-500);
      line-height: 1.4rem;
    }

    & svg {
      width: 1.4rem;
      height: 1.4rem;
      color: var(--color-red-pure);
      transition: all 0.3s;
      vertical-align: middle;
    }
    & span {
      font-size: 1.1rem;
      color: var(--color-red-pure);
    }
  }

  hr {
    margin: 0px 10px;
    flex-shrink: 0;
    border-width: 0px thin 0px 0px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
    height: auto;
    align-self: stretch;
  }
`;
RFICardStackContent.defaultProps = {
  type: "card-stack",
};

const RFIStatus = styled.h2`
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 2px 5px;
  border-radius: 4px;
  color: var(--color-grey-0);
  background-color: ${({ $status }) => getColorStatus($status)};
`;

const RFIPriority = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  min-width: 4.5rem;
  border-radius: 4px;
  ${(props) => priorities[props.$priority]}
`;
RFIPriority.defaultProps = {
  $priority: "primary",
};

const RFIHeading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 1.6rem;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 1.4rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.3rem;
      font-weight: 500;
      color: var(--color-nbi-color);
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.2rem;
    `}
`;
const RFICardStackRight = styled.div`
  ${(props) =>
    props.type === "card-stack-r-lbl" &&
    css`
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
    `}
  ${(props) =>
    props.type === "card-stack-r-btn" &&
    css`
      display: grid;
      grid-template-columns: repeat(1, 4fr);
      gap: 10px;
      width: 100%;

      div {
        /* display: grid;
        gap: 10px;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        grid-column: 2 / span 1;
        width: 100%; */
        display: flex;
        gap: 10px;
        grid-column: 2 / span 1;
        width: 100%;
        flex-direction: row-reverse;
      }

      div :nth-child(1) {
        order: 4;
      }
      div :nth-child(2) {
        order: 3;
      }
      div :nth-child(3) {
        order: 2;
      }
      div :nth-child(4) {
        order: 1;
      }
    `}

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

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   column-gap: 2.4rem;
//   align-items: center;
// `;
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   column-gap: 2.4rem;
//   align-items: center;
// `;

function RFIRow({ rfi }) {
  const { isDeleting, deleteRFI } = useDeleteRFI();
  const { isCreating, addRFI } = useCreateRFI();

  const {
    id: rfi_id,
    current_status,
    da,
    ribbon,
    rfi_type,
    forecast_stautus,
    status_entegro,
    creation_date,
    forecast_handover_date,
    current_forecast_date,
    start_date,
    name_of_resource_1,
    handover_date,
    description_of_works,
    rfi_reference,
    priority_nbiq,
    map_url,
  } = rfi;

  function handleDuplicate() {
    addRFI({
      da: `Copy of ${da}`,
      rfi_reference,
      current_status,
      ribbon,
      rfi_type,
      forecast_stautus,
      status_entegro,
      creation_date,
      forecast_handover_date,
      current_forecast_date,
      start_date,
      name_of_resource_1,
      handover_date,
      description_of_works,
      priority_nbiq,
      map_url,
    });
  }
  const status_number =
    current_status && Number(current_status.split(" ")[0].replace(".", ""));

  return (
    <RFICard $status={status_number} role="rfi-card">
      <RFICardStack type="card-container-left">
        <RFICardStackContent>
          <RFIStatus $status={status_number}>{current_status}</RFIStatus>
          <RFIHeading as="h2">{da}</RFIHeading>
          <hr />
          <RFIHeading as="h2">{ribbon}</RFIHeading>
        </RFICardStackContent>
        <RFICardStackContent>
          <RFIHeading as="h3">{rfi_type}</RFIHeading>
          <RFIHeading as="h3">
            <div>{forecast_stautus}</div>
          </RFIHeading>
          <RFIHeading as="h3">
            <div>{status_entegro}</div>
          </RFIHeading>
        </RFICardStackContent>
        <RFICardStackContent type="card-stack-full">
          <div>
            <RFICardInfo
              label="Created At"
              rfi_field={formatDate(creation_date)}
            />

            <RFICardInfo
              label="Forecast Handover Date"
              rfi_field={formatDate(forecast_handover_date)}
            />
            <RFICardInfo
              label="Current Forecast Date"
              rfi_field={formatDate(current_forecast_date)}
            />
            <RFICardInfo
              label="Start Date"
              rfi_field={formatDate(start_date)}
            />
            <RFICardInfo label="QC Lead" rfi_field={name_of_resource_1} />
            <RFICardInfo
              label="Handover Date"
              rfi_field={formatDate(handover_date)}
            />
          </div>
        </RFICardStackContent>
        <RFICardStackContent>
          <p>
            <strong>Description of Work: </strong>
            {description_of_works}
          </p>
        </RFICardStackContent>
      </RFICardStack>

      <RFICardStack type="card-container-right">
        <RFICardStackRight type="card-stack-r-lbl">
          <RFIHeading as="h2">RFI {rfi_reference}</RFIHeading>
          {priority_nbiq && (
            <RFIPriority $priority={priority_nbiq}>{priority_nbiq}</RFIPriority>
          )}
        </RFICardStackRight>
        <RFICardStackRight type="card-stack-r-btn">
          <div>
            <RFIBtn id={rfi_id} title="View RFI Details">
              <MdOutlineAssignment />
            </RFIBtn>
            {map_url && (
              <RFIBtn id={rfi_id} to={map_url} title="Open Map">
                <TfiMapAlt />
              </RFIBtn>
            )}
            <RFIBtn id={rfi_id} title="View Wayleave Status">
              <HiOutlineDocumentReport />
            </RFIBtn>
            <RFIBtn id={rfi_id} title="View Survey Status">
              <RiSurveyLine />
            </RFIBtn>
          </div>

          <div>
            <button
              disabled={isCreating}
              onClick={handleDuplicate}
              title="Duplicate RFI"
            >
              <IoDuplicateOutline />
            </button>

            <Modal>
              <Modal.Open opens="edit">
                <button title="Edit RFI">
                  <MdOutlineEditNote />
                </button>
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateRFIForm rfiToEdit={rfi} />
              </Modal.Window>

              <Modal.Open opens="delete">
                <button title="Delete RFI">
                  <MdDeleteOutline />
                </button>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmDelete
                  fieldName={`RFI ${rfi_reference}?`}
                  disabled={isDeleting}
                  onConfirm={() => deleteRFI(rfi_id)}
                />
              </Modal.Window>
            </Modal>
          </div>
        </RFICardStackRight>
      </RFICardStack>
    </RFICard>
  );
}

export default RFIRow;
