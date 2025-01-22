import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRFIs } from "../../services/apiRFIs";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useRFIs() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const currentStatusFilter = searchParams.get("current_status") || "5"; //5. Sent for Redesign
  const statusEntegroFilter = searchParams.get("status_entegro") || "all";
  const rfiReferenceFilter = searchParams.get("rfi_reference") || "";
  const daFilter = searchParams.get("da") || "all";

  // SORTING
  const sortByRaw = searchParams.get("sortBy") || "id-desc";
  const [field, direction] = sortByRaw.split("-");

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: rfis, totalCount } = {},
    error,
  } = useQuery({
    queryKey: [
      "rfis",
      currentStatusFilter,
      statusEntegroFilter,
      rfiReferenceFilter,
      daFilter,
      sortByRaw,
      page,
    ],
    queryFn: () =>
      getRFIs({
        currentStatusFilter,
        statusEntegroFilter,
        rfiReferenceFilter,
        daFilter,
        sortByField: field,
        sortByDirection: direction,
        page,
      }),
    keepPreviousData: true, // prefetching first before rendered.
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        "rfis",
        currentStatusFilter,
        statusEntegroFilter,
        rfiReferenceFilter,
        daFilter,
        sortByRaw,
        page + 1,
      ],
      queryFn: () =>
        getRFIs({
          currentStatusFilter,
          statusEntegroFilter,
          rfiReferenceFilter,
          daFilter,
          sortByField: field,
          sortByDirection: direction,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        "rfis",
        currentStatusFilter,
        statusEntegroFilter,
        rfiReferenceFilter,
        daFilter,
        sortByRaw,
        page - 1,
      ],
      queryFn: () =>
        getRFIs({
          currentStatusFilter,
          statusEntegroFilter,
          rfiReferenceFilter,
          daFilter,
          sortByField: field,
          sortByDirection: direction,
          page: page - 1,
        }),
    });

  return { isLoading, error, rfis, totalCount };
}
