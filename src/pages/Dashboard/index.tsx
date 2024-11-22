import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Loading } from "~/components/Loading";
import { useStatusUpdateContext } from "~/contexts/statusUpdateContext";
import { RegistrationUser, registrationUserSchema } from "~/schemas/registrationUser";

import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";

const DashboardPage: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
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
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
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
      <Collumns registrations={filteredRegistrations} />
    </S.Container>
  );
};

export default DashboardPage;
