import Spinner from "../../ui/Spinner";

import Empty from "../../ui/Empty";
import WayleaveRow from "./WayleaveRow";
import styled from "styled-components";

import { useRFIWayleave } from "./useRFIWayleave";
import Row from "../../ui/Row";

import { useMoveBack } from "../../hooks/useMoveBack";
import Heading from "../../ui/Heading";

import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { useRFI } from "../rfi/useRFI";
import { useParams } from "react-router-dom";
import AddWayleave from "./AddWayleave";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  border-radius: 7px;
  overflow: hidden;
`;
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.1fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.4fr 0.3fr 0.5fr 0.12fr;
  padding: 0.3rem 1rem;
  gap: 0.5rem;

  align-items: center;
  background-color: var(--color-grey-800);

  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-grey-0);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

function WayleaveTracker() {
  const { rfi_reference } = useParams();
  const moveBack = useMoveBack();
  const { wayleaves, isLoading } = useRFIWayleave(rfi_reference);
  const { rfi, isLoading: isLoadingRFI } = useRFI(rfi_reference);

  if (isLoading || isLoadingRFI) return <Spinner />;

  if (!wayleaves.length) return <Empty dataName="rfis" />;

  const { description_of_works } = rfi;

  return (
    <>
      <Row>
        <ButtonGroup>
          <Button $size="medium" onClick={moveBack} title="Go Back to RFI List">
            <TiArrowBackOutline />
          </Button>
        </ButtonGroup>
      </Row>
      <h3>{`Wayleave Tracker`}</h3>

      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h4">
            <b>RFI #{rfi_reference}</b>
            <br />
            Description of works: {description_of_works}
          </Heading>
        </HeadingGroup>
      </Row>

      <AddWayleave rfi={rfi} title="Add New Wayleave" />

      <Table role="wayleave-tracker" $tblType="second_tbl">
        <TableHeader role="row">
          <div>ID</div>
          <div>RFI Reference</div>
          <div>DA</div>
          <div>OLT</div>
          <div>Date Submitted</div>
          <div>Layer</div>
          <div>Wayleave Status</div>
          <div>Label</div>
          <div>Remarks</div>
          <div>Modes</div>
        </TableHeader>
        {wayleaves
          .sort(
            (a, b) => new Date(b.date_submitted) - new Date(a.date_submitted)
          )
          .map((wayleave) => (
            <WayleaveRow wayleave={wayleave} key={wayleave.id} />
          ))}
      </Table>
    </>
  );
}

export default WayleaveTracker;
