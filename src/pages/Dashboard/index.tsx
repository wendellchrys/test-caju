import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Loading } from "~/components";
import { useStatusUpdateContext } from "~/contexts/statusUpdateContext";
import { RegistrationUser, registrationUserSchema } from "~/schemas/registrationUser";

import { Columns } from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";

const DashboardPage: React.FC = () => {
  const apiUrl = process.env.VITE_API_URL;
  const { lastUpdated } = useStatusUpdateContext();
  const [registrations, setRegistrations] = useState<RegistrationUser[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/registrations`);
      const validatedData = response.data.map((item: any) => registrationUserSchema.parse(item));
      setRegistrations(validatedData);
      setFilteredRegistrations(validatedData);

      //simulando demora do servidor
      await new Promise((resolve) => setTimeout(resolve, 1000));

    } catch (error) {
      toast.error("Erro ao buscar registros.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [lastUpdated]);

  const handleSearch = (cpf: string) => {
    if (!cpf) {
      setFilteredRegistrations(registrations);
      return;
    }

    const filtered = registrations.filter((registration) =>
      registration.cpf.replace(/\D/g, '').includes(cpf)
    );
    setFilteredRegistrations(filtered);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} handleRefresh={fetchRegistrations} />
      <Columns registrations={filteredRegistrations} />
    </S.Container>
  );
};

export default DashboardPage;
