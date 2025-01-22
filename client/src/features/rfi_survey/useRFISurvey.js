import { useQuery } from "@tanstack/react-query";
import { getRFIWithSurvey } from "../../services/apiRFIs";

export function useRFISurvey(rfi_reference) {
  const {
    isLoading,
    data: { data: surveys, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ["surveys", rfi_reference],
    queryFn: () => getRFIWithSurvey(rfi_reference),
    keepPreviousData: true, // prefetching first before rendered.
  });

  return { isLoading, error, surveys, totalCount };
}
