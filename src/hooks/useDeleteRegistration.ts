import { useState } from "react";
import toast from "react-hot-toast";

import { useStatusUpdateContext } from "~/contexts/statusUpdateContext";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDeleteRegistration = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { setLastUpdated } = useStatusUpdateContext();

  const deleteRegistration = async (id: string) => {
    try {
      setIsDeleting(true);

      const response = await fetch(`${apiUrl}/registrations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o registro.");
      }

      toast.success("Registro deletado com sucesso!");
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      toast.error("Erro ao deletar o registro.");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteRegistration, isDeleting };
};
