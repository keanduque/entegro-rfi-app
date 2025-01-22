import { useQuery } from "@tanstack/react-query";
import { getRFIForStats } from "../../services/apiRFIs";

export function useRFIStats() {
  const { isLoading, data: { data: rfis } = {} } = useQuery({
    queryKey: ["rfis"],
    queryFn: getRFIForStats,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    rfis,
    isLoading,
  };
}
