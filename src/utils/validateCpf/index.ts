export const validateCpf = (cpf: string): boolean => {

  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const calculateCheckDigit = (cpf: string, factor: number): number => {
    let sum = 0;
    for (let i = 0; i < factor - 1; i++) {
      sum += parseInt(cpf.charAt(i)) * (factor - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheckDigit = calculateCheckDigit(cpf, 10);
  const secondCheckDigit = calculateCheckDigit(cpf, 11);

  if (firstCheckDigit !== parseInt(cpf.charAt(9))) {
    return false;
  }

  if (secondCheckDigit !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
};
