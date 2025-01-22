import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function RFITableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="current_status"
        options={[
          { value: "all", label: "All" },
          { value: "5", label: "5. Sent for Redesign" },
          { value: "2", label: "2. PSPD notified" },
          { value: "11", label: "11. For Assessment" },
        ]}
      />
      <SortBy
        options={[
          {
            value: "id-desc",
            label: "Sort by Created Date (Latest first)",
          },
          {
            value: "id-asc",
            label: "Sort by Created Date (Oldest first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default RFITableOperations;
