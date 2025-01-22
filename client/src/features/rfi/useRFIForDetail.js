import { useQuery } from "@tanstack/react-query";
import { getRfiByID } from "../../services/apiRFIs";
import { useParams } from "react-router-dom";

export function useRFIForDetail() {
  const { id } = useParams();

  const {
    isLoading,
    data: rfi,
    error,
  } = useQuery({
    queryKey: ["rfi", id],
    queryFn: () => getRfiByID({ id }),
    keepPreviousData: true, // prefetching first before rendered.
    retry: false,
  });

  return { rfi, isLoading, error };
}
