import { useQuery } from "@tanstack/react-query";
import { getRFIWithWayleave } from "../../services/apiRFIs";

export function useRFIWayleave(rfi_reference) {
  const {
    isLoading,
    data: { data: wayleaves, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ["wayleaves", rfi_reference],
    queryFn: () => getRFIWithWayleave(rfi_reference),
    keepPreviousData: true, // prefetching first before rendered.
  });

  return { isLoading, error, wayleaves, totalCount };
}
