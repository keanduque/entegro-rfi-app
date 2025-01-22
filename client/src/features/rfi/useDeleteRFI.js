import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteRFI as deleteRFIApi } from "../../services/apiRFIs";

export function useDeleteRFI() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteRFI } = useMutation({
    mutationFn: (id) => deleteRFIApi(id),
    onSuccess: () => {
      toast.success("RFI successfully deleted.");

      queryClient.invalidateQueries({
        queryKey: ["rfis"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteRFI };
}
