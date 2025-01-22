import RFITableOperations from "../features/rfi/RFITableOperations";
import RFITable from "../features/rfi/RFITable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function RFIs() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"></Heading>
      </Row>

      <Row>
        <RFITableOperations />
        {/* <AddRFI /> */}
        <RFITable />
      </Row>
    </>
  );
}

export default RFIs;
