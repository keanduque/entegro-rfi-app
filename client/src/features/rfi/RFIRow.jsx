import styled, { css } from "styled-components";
import { getColorStatus, priorities } from "../../styles/Statuses";

import { TfiMapAlt } from "react-icons/tfi";
import { MdOutlineHandshake } from "react-icons/md";
import { RiSurveyLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";

import { RFIBtn } from "./RFIBtn";
import { RFICardInfo } from "./RFICardInfo";
import { formatDate, statusNo, rfiNumberGenerator } from "../../utils/helpers";
import { useDeleteRFI } from "./useDeleteRFI";
import { useCreateRFI } from "./useCreateRFI";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateRFIForm from "./CreateRFIForm";
import CreateRFIAssessmentForm from "./CreateRFIAssessmentForm";
import { media } from "../../styles/MediaQueries";
import { useNavigate } from "react-router-dom";
import SurveyForm from "../rfi_survey/SurveyTracker";
import { useRFISurvey } from "../rfi_survey/useRFISurvey";
import { useRFIWayleave } from "../rfi_wayleave/useRFIWayleave";

export const RFICard = styled.div`
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

export const RFICardStack = styled.div`
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

export const RFICardStackContent = styled.div`
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

        @media screen and (max-width: ${media.md}) {
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

export const RFIStatus = styled.h2`
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 2px 5px;
  border-radius: 4px;
  color: var(--color-grey-0);
  background-color: ${({ $status }) => getColorStatus($status)};
`;

export const RFIPriority = styled.h2`
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

export const RFIHeading = styled.h1`
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
export const RFICardStackRight = styled.div`
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
        // div for buttons
        display: flex;
        gap: 10px;
        grid-column: 2 / span 1;
        width: 100%;
        flex-direction: row-reverse;
        align-items: flex-start;
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
    reason_for_on_hold,
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
    billing,
    difficulty,
    rfi_root_cause,
    awaiting_nbi,
    t1_application,
    survey_required,
    wayleave_required,
    map_url,
  } = rfi;

  const { surveys: rfisWithSurvey } = useRFISurvey(rfi_reference);

  const { wayleaves: rfisWithWayleave } = useRFIWayleave(rfi_reference);

  function handleDuplicate() {
    addRFI({
      da: `Copy of ${da}`,
      rfi_reference: rfiNumberGenerator(),
      current_status,
      ribbon,
      rfi_type,
      forecast_stautus,
      reason_for_on_hold,
      status_entegro,
      creation_date,
      forecast_handover_date,
      current_forecast_date,
      start_date,
      name_of_resource_1,
      handover_date,
      description_of_works,
      priority_nbiq,
      billing,
      difficulty,
      rfi_root_cause,
      awaiting_nbi,
      t1_application,
      survey_required,
      wayleave_required,
      map_url,
    });
  }

  const currentStatusCode = statusNo(current_status);
  const statusEntegroCode = statusNo(status_entegro);

  // console.log(status_entegro);

  const statusCodes = {
    statusEntegroCode,
    currentStatusCode,
    status_entegro,
    forecast_stautus,
    reason_for_on_hold,
    rfi_reference,
  };

  const navigate = useNavigate();

  return (
    <RFICard $status={currentStatusCode} role="rfi-card">
      <RFICardStack type="card-container-left">
        <RFICardStackContent>
          {current_status && (
            <RFIStatus $status={currentStatusCode}>{current_status}</RFIStatus>
          )}
          {da && <RFIHeading as="h2">{da}</RFIHeading>}
          <hr />
          {ribbon && <RFIHeading as="h2">{ribbon}</RFIHeading>}
        </RFICardStackContent>
        <RFICardStackContent>
          {rfi_type && <RFIHeading as="h3">{rfi_type}</RFIHeading>}
          {forecast_stautus && (
            <RFIHeading as="h3">
              <div>{forecast_stautus}</div>
            </RFIHeading>
          )}
          {status_entegro && (
            <RFIHeading as="h3">
              <div>{status_entegro}</div>
            </RFIHeading>
          )}
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
            {/* <RFIBtn
              id={rfi_id}
              title="View RFI Details"
              onClick={() => navigate(`/rfi/${rfi_id}`)}
            >
              <MdOutlineAssignment />
            </RFIBtn> */}
            {map_url && (
              <RFIBtn id={rfi_id} to={map_url} title="Open Map">
                <TfiMapAlt />
              </RFIBtn>
            )}
            {rfisWithWayleave?.length > 0 && (
              // status_entegro is equal to "8. Wayleave Required" currently based on the data of wayleave
              <>
                <RFIBtn
                  id={rfi_id}
                  title="Wayleave Tracker"
                  onClick={() => navigate(`/rfi/wayleave/${rfi_reference}`)}
                >
                  <MdOutlineHandshake />
                </RFIBtn>
              </>
            )}
            <Modal>
              {
                // status_entegro is equal to "9. Survey Required"
                //statusEntegroCode === 9 && (
                rfisWithSurvey?.length > 0 && (
                  <>
                    <Modal.Open opens="survey">
                      <button title="Survey Tracker">
                        <RiSurveyLine />
                      </button>
                    </Modal.Open>
                    <Modal.Window name="survey">
                      <SurveyForm rfi_reference={rfi_reference} />
                    </Modal.Window>
                  </>
                )
              }
            </Modal>
          </div>

          <div>
            {/* // BEGIN DUPLICATE BUTTON DONT DELETE */}
            {/* <button
              disabled={isCreating}
              onClick={handleDuplicate}
              title="Duplicate RFI"
            >
              <IoDuplicateOutline />
            </button> */}
            {/* END DUPLICATE BUTTON DONT DELETE*/}
            <Modal>
              {
                // "5. Sent for Redesign" OR "2. PSDP notified"
                // currentStatusCode === 5 || currentStatusCode === 2
                currentStatusCode === 5 ||
                currentStatusCode === 2 ||
                current_status ===
                  "null" /* remove this line after testing */ ? (
                  <Modal.Open opens="edit">
                    <button title="Edit RFI">
                      <MdOutlineEditNote />
                    </button>
                  </Modal.Open>
                ) : (
                  ""
                )
              }
              <Modal.Window name="edit">
                {/* <CreateRFIForm rfiToEdit={rfi} statuses={statusCodes || ""} /> */}
                {statusEntegroCode === 11 && currentStatusCode !== 2 ? (
                  <CreateRFIAssessmentForm
                    rfiToEdit={rfi}
                    statuses={statusCodes || ""}
                  />
                ) : (
                  <CreateRFIForm rfiToEdit={rfi} statuses={statusCodes || ""} />
                )}
              </Modal.Window>
              <Modal.Open opens="delete">
                <button title="Delete RFI">
                  <MdDeleteOutline />
                </button>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmDelete
                  fieldName={`RFI ${rfi_reference}`}
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
