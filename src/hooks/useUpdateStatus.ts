import { useState } from "react";
import toast from "react-hot-toast";

import { useStatusUpdateContext } from "~/contexts/statusUpdateContext";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setLastUpdated } = useStatusUpdateContext();

  const updateStatus = async (
    data: { id: string; [key: string]: any },
    newStatus: string
  ) => {
    try {
      setIsLoading(true);

      const updatedData = { ...data, status: newStatus };

      const response = await fetch(`${apiUrl}/registrations/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status.");
      }

      toast.success(`Status atualizado para ${newStatus}`);
      setLastUpdated(new Date().toISOString()); 
    } catch (err) {
      toast.error("Erro ao atualizar o status.");
      console.error("erro", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading };
};
