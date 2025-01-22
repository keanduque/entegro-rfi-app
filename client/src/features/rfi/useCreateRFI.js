import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRFI } from "../../services/apiRFIs";
import toast from "react-hot-toast";

export function useCreateRFI() {
  const queryClient = useQueryClient();
  const { mutate: addRFI, isLoading: isCreating } = useMutation({
    mutationFn: createRFI,
    onSuccess: () => {
      toast.success("New RFI successfully created!");
      queryClient.invalidateQueries({ queryKey: ["rfis"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addRFI };
}
