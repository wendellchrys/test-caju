import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { ZodError } from "zod";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import { useGoToHome } from "~/hooks/useGoToHome";
import { newUser, newUserSchema } from "~/schemas/newUser";
import { maskCpf } from "~/utils";

import * as S from "./styles";



const NewUserPage = () => {

  const goToHome = useGoToHome();

  const [formData, setFormData] = useState<newUser>({
    employeeName: "",
    email: "",
    cpf: "",
    admissionDate: "",
    status: "REVIEW",
  });


  const [errors, setErrors] = useState<Partial<Record<keyof newUser, string>>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const maskedValue = name === "cpf" ? maskCpf(value) : value;

    setFormData({ ...formData, [name]: maskedValue });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...formData,
        admissionDate: formData.admissionDate
          ? formData.admissionDate.split("-").reverse().join("/")
          : "",
      };

      newUserSchema.parse(formattedData);

      setIsSubmitting(true);
      setErrors({});

      const response = await fetch("http://localhost:3000/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formattedData, cpf: formattedData.cpf.replace(/\D/g, "") }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário.");
      }

      setFormData({
        employeeName: "",
        email: "",
        cpf: "",
        admissionDate: "",
        status: "REVIEW",
      });
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        goToHome();
      }, 2000);

    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof newUser, string>> = {};
        err.errors.forEach((error) => {
          if (error.path && error.path.length > 0) {
            const fieldName = error.path[0] as keyof newUser;
            fieldErrors[fieldName] = error.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Erro ao validar os dados do formulário.");
      } else {
        setErrors({ employeeName: "Erro ao cadastrar usuário." });
        toast.error("Erro ao cadastrar usuário.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <S.ContainerTextField>
          <TextField
            placeholder="Nome"
            label="Nome"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
          />
          {errors.employeeName && <S.Error>{errors.employeeName}</S.Error>}
        </S.ContainerTextField>
        <S.ContainerTextField>
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <S.Error>{errors.email}</S.Error>}
        </S.ContainerTextField>
        <S.ContainerTextField>
          <TextField
            placeholder="CPF"
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            maxLength={14}
          />
          {errors.cpf && <S.Error>{errors.cpf}</S.Error>}
        </S.ContainerTextField>
        <S.ContainerTextField>
          <TextField
            label="Data de admissão"
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
          />
          {errors.admissionDate && <S.Error>{errors.admissionDate}</S.Error>}
        </S.ContainerTextField>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
