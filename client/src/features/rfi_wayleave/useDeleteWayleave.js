import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteWayleave as deleteWayleaveApi } from "../../services/apiRFIs";

export function useDeleteWayleave() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteWayleave } = useMutation({
    mutationFn: (id) => deleteWayleaveApi(id),
    onSuccess: () => {
      toast.success("Wayleave successfully deleted.");

      queryClient.invalidateQueries({
        queryKey: ["wayleaves"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteWayleave };
}
