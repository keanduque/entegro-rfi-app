import { formatDateHHmmss } from "../../utils/helpers";
import styled, { css } from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.4fr repeat(5, 0.3fr) 0.4fr repeat(3, 1fr) 0.4fr;
  padding: 0.3rem 1rem;
  gap: 0.5rem;
  background-color: var(--color-grey-0);
  align-items: flex-start;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const columnTypes = {
  normal: css`
    background-color: transparent;
    color: var(--color-grey-700);
  `,

  with_status: css`
    background-color: ${(props) =>
      props.$status === "Closed"
        ? "green"
        : props.$status
        ? "red"
        : "transparent"};
    color: ${(props) =>
      props.$status === "Closed" || props.$status
        ? "white"
        : "var(--color-grey-700)"};
    padding: 0.5rem;
    text-align: center;
    display: grid;
    align-items: center;
    height: -webkit-fill-available;
    border-radius: 5px;
  `,
};

const Col = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-grey-700);
  height: -webkit-fill-available;

  ${(props) => columnTypes[props.$columnType]}
`;

Col.defaultProps = {
  $colType: "normal",
};

function SurveyRow({ rfi }) {
  const {
    rfi_reference,
    request_id,
    olt_name,
    ribbon_name,
    status,
    design_stage,
    date_raised,
    planners_notes,
    survey_notes,
    comments,
    request_reason,
  } = rfi;
  return (
    <TableRow role="row">
      <Col>{rfi_reference}</Col>
      <Col>{request_id}</Col>
      <Col>{olt_name}</Col>
      <Col>{ribbon_name}</Col>
      <Col $columnType="with_status" $status={status}>
        {status}
      </Col>
      <Col>{design_stage}</Col>
      <Col>{formatDateHHmmss(date_raised)}</Col>
      <Col>{planners_notes}</Col>
      <Col>{survey_notes}</Col>
      <Col>{comments}</Col>
      <Col>{request_reason}</Col>
    </TableRow>
  );
}

export default SurveyRow;
