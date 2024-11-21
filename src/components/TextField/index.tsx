import { InputHTMLAttributes } from "react";
import { FiX } from "react-icons/fi";

import * as S from './styles'

type Props = {
  label?: string;
  error?: string;
  clearable?: boolean;
  onClear?: () => void;
} & InputHTMLAttributes<any>;

const TextField: React.FC<Props> = ({ label, error, clearable, onClear, ...props }: Props) => {
  return (
    <div>
      {label && <label htmlFor={props.id}>{label}</label>}
      <S.InputContainer>
        <S.Input {...props} />
        {clearable && props.value && (
          <S.ClearButton type="button" onClick={onClear}>
            <FiX />
          </S.ClearButton>
        )}
      </S.InputContainer>
      {error && <span style={{ fontSize: 12, color: "red" }}>{error}</span>}
    </div>
  );
};

export default TextField;
