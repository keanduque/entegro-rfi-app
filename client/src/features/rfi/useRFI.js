import { useQuery } from "@tanstack/react-query";
import { getByRfiReference } from "../../services/apiRFIs";
import { useParams } from "react-router-dom";

export function useRFI() {
  const { rfi_reference } = useParams();

  const {
    isLoading,
    data: rfi, // Match API structure
    error,
  } = useQuery({
    queryKey: ["rfi", rfi_reference],
    queryFn: () => getByRfiReference({ rfi_reference }),
    keepPreviousData: true, // prefetching first before rendered.
    retry: false,
  });

  return { rfi, isLoading, error };
}
