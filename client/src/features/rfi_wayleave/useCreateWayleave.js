import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWayleave } from "../../services/apiRFIs";
import toast from "react-hot-toast";

export function useCreateWayleave() {
  const queryClient = useQueryClient();
  const { mutate: addWayleave, isLoading: isCreating } = useMutation({
    mutationFn: createWayleave,
    onSuccess: () => {
      toast.success("New Wayleave successfully created!");
      queryClient.invalidateQueries({ queryKey: ["wayleaves"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addWayleave };
}
