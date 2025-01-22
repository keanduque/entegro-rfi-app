import Spinner from "../../ui/Spinner";
import RFIRow from "./RFIRow";
import { useRFIs } from "./useRFIs";
import { useSearchParams } from "react-router-dom";
import { statusStr } from "../../utils/helpers";
import Table from "../../ui/Table";
import RFIRowSkeleton from "./RFIRowSkeleton";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

function RFITable() {
  const { rfis, isLoading, totalCount } = useRFIs();
  const [searchParams] = useSearchParams();
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

  // FILTER
  const currentStatusFilter = searchParams.get("current_status") || "5";
  const statusEntegroFilter = searchParams.get("status_entegro") || "all";
  const daFilter = searchParams.get("da") || "all";
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  let filteredRFIs = rfis;

  // Filter by current_status
  if (currentStatusFilter !== "all") {
    filteredRFIs = filteredRFIs.filter(
      (rfi) => statusStr(rfi.current_status) === currentStatusFilter
    );
  }

  // Filter by status_entegro
  if (statusEntegroFilter !== "all") {
    filteredRFIs = filteredRFIs.filter(
      (rfi) => statusStr(rfi.status_entegro) === statusEntegroFilter
    );
  }

  // Filter by da
  if (daFilter !== "all") {
    filteredRFIs = filteredRFIs.filter((rfi) => rfi.da === daFilter);
  }

  // Filter by search query
  if (searchQuery) {
    filteredRFIs = filteredRFIs.filter((rfi) =>
      Object.values(rfi).join(" ").toLowerCase().includes(searchQuery)
    );
  }

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // SORT BY ID
  const sortBy = searchParams.get("sortBy") || "id-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedRFIs = filteredRFIs.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (!sortedRFIs.length) return <Empty dataName="rfis" />;

  return (
    <Table role="rfi-cards">
      <Table.Footer>
        <Pagination count={totalCount} />
      </Table.Footer>
      {sortedRFIs.map((rfi) => (
        <RFIRow rfi={rfi} key={rfi.id} />
      ))}
    </Table>
  );
}

export default RFITable;
