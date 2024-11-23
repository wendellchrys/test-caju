import { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import { Button, TextField } from "~/components";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";
import { maskCpf, validateCpf } from "~/utils";

import * as S from "./styles";

type SearchBarProps = {
    handleSearch: (cpf: string) => void;
    handleRefresh: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ handleSearch, handleRefresh }: SearchBarProps) => {
    const history = useHistory();
    const [cpf, setCpf] = useState("");

    const goToNewAdmissionPage = () => {
        history.push(routes.newUser);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = maskCpf(e.target.value);
        setCpf(maskedValue);
    };

    const handleClear = () => {
        setCpf("");
        handleRefresh();
    };

    useEffect(() => {
        const cleanCpf = cpf.replace(/\D/g, "");
        if (validateCpf(cleanCpf)) {
            handleSearch(cleanCpf);
        }
    }, [cpf, handleSearch]);

    return (
        <S.Container>
            <TextField
                placeholder="Digite um CPF válido"
                value={cpf}
                onChange={handleChange}
                maxLength={14}
                clearable
                onClear={handleClear}
            />
            <S.Actions>
                <IconButton aria-label="refetch" onClick={handleRefresh}>
                    <HiRefresh />
                </IconButton>
                <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
            </S.Actions>
        </S.Container>
    );
};
