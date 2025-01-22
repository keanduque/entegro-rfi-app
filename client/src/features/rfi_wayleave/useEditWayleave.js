import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWayleave } from "../../services/apiRFIs";
import toast from "react-hot-toast";

export function useEditWayleave() {
  const queryClient = useQueryClient();
  const { mutate: editWayleave, isLoading: isEditing } = useMutation({
    mutationFn: updateWayleave,
    onSuccess: () => {
      toast.success("Wayleave successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["wayleaves"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editWayleave };
}
