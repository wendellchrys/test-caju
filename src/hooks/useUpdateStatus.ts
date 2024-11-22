import { useState } from "react";
import toast from "react-hot-toast";

import { STATUS_LABELS } from "~/constants";
import { useStatusUpdateContext } from "~/contexts/statusUpdateContext";

type StatusKey = keyof typeof STATUS_LABELS;

const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setLastUpdated } = useStatusUpdateContext();

  const updateStatus = async (
    data: { id: string; [key: string]: any },
    newStatus: StatusKey
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

      const statusLabel = STATUS_LABELS[newStatus];
      toast.success(`Status atualizado para ${statusLabel}`);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      toast.error("Erro ao atualizar o status.");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading };
};
