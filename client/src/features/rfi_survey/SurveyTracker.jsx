import Spinner from "../../ui/Spinner";

import Empty from "../../ui/Empty";
import SurveyRow from "./SurveyRow";
import styled from "styled-components";
import { ModalContent } from "../../ui/Modal";
import { useRFISurvey } from "./useRFISurvey";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  border-radius: 7px;
  overflow: hidden;
`;
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.4fr repeat(5, 0.3fr) 0.4fr repeat(3, 1fr) 0.4fr;
  align-items: center;
  background-color: var(--color-grey-800);

  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-grey-0);

  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

function SurveyTracker({ rfi_reference }) {
  const { surveys, isLoading } = useRFISurvey(rfi_reference);
  if (isLoading) return <Spinner />;

  if (!surveys.length) return <Empty dataName="rfis" />;

  return (
    <>
      <h3>{`Survey Tracker`}</h3>
      <ModalContent>
        <Table role="survey-tracker" $tblType="second_tbl">
          <TableHeader role="row">
            <div>RFI Reference</div>
            <div>Request ID</div>
            <div>OLT Name</div>
            <div>Ribbon Name</div>
            <div>Status</div>
            <div>Design Stage</div>
            <div>Date Requested</div>
            <div>Planner Notes</div>
            <div>Survey Notes</div>
            <div>Comments</div>
            <div>Request Reason</div>
          </TableHeader>
          {surveys.map((survey) => (
            <SurveyRow rfi={survey} key={survey.globalid} />
          ))}
        </Table>
      </ModalContent>
    </>
  );
}

export default SurveyTracker;
