import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRFI } from "../../services/apiRFIs";
import toast from "react-hot-toast";

export function useEditRFI() {
  const queryClient = useQueryClient();
  const { mutate: editRFI, isLoading: isEditing } = useMutation({
    mutationFn: updateRFI,
    onSuccess: () => {
      toast.success("RFI successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["rfis"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editRFI };
}
