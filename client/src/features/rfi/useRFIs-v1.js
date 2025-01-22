import { useQuery } from "@tanstack/react-query";
import { getRFIs } from "../../services/apiRFIs";

export function useRFIs() {
  const {
    isLoading,
    data: { data: rfis, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ["rfis"],
    queryFn: getRFIs,
  });

  return { isLoading, error, rfis, totalCount };
}
