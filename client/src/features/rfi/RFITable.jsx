import RFIRow from "./RFIRow";
import { useRFIs } from "./useRFIs";
import Table from "../../ui/Table";
import RFIRowSkeleton from "./RFIRowSkeleton";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

function RFITable() {
  const { rfis, isLoading, totalCount } = useRFIs();

  //if (isLoading) return <Spinner />;

  // Placeholder loading skeleton rows
  if (isLoading)
    return (
      <Table role="rfi-cards">
        {Array.from({ length: 5 }).map((_, index) => (
          <RFIRowSkeleton key={index} />
        ))}
      </Table>
    );

  return (
    <Table role="rfi-cards">
      <Table.Footer>
        <Pagination count={totalCount} />
      </Table.Footer>
      {rfis.length > 0 ? (
        rfis.map((rfi) => <RFIRow rfi={rfi} key={rfi.id} />)
      ) : (
        <Empty dataName="rfis" />
      )}
    </Table>
  );
}

export default RFITable;
