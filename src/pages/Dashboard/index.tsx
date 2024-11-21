import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { RegistrationUser, registrationUserSchema } from "~/schemas/registrationUser";

import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";

const DashboardPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<RegistrationUser[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationUser[]>([]);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/registrations");
      const validatedData = response.data.map((item: any) => registrationUserSchema.parse(item));
      setRegistrations(validatedData);
      setFilteredRegistrations(validatedData);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      toast.error("Erro ao buscar registros.");
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

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

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} handleRefresh={fetchRegistrations} />
      <Collumns registrations={filteredRegistrations} />
    </S.Container>
  );
};

export default DashboardPage;
