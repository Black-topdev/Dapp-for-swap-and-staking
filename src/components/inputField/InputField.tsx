import { classNameGenerator, sanitizeNumberInput } from 'utils/pureFunctions';
import 'components/inputField/InputField.css';

interface InputFieldProps {
  input: string | number;
  setInput?: Function;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  format?: boolean;
  bgGrey?: boolean;
  borderGrey?: boolean;
  onChange?: Function;
  onBlur?: Function;
  customClass?: string;
  dataCy?: string;
}

export const InputField = ({
  input,
  setInput,
  placeholder,
  type = 'text',
  format,
  bgGrey,
  borderGrey,
  onChange,
  onBlur,
  dataCy,
  customClass,
}: InputFieldProps) => {
  const inputFieldStyles = `input-field justify-center ${classNameGenerator({
    'input-field-bg-grey': bgGrey,
    'input-field-border': borderGrey,
    'text-right': format,
    [`${customClass}`]: customClass,
  })}`;

  return (
    <input
      type={type}
      data-cy={dataCy}
      value={input}
      placeholder={placeholder}
      className={inputFieldStyles}
      onChange={(event) => {
        const val = format
          ? sanitizeNumberInput(event.target.value)
          : event.target.value;
        onChange ? onChange(val) : setInput && setInput(val);
      }}
      onBlur={() => onBlur && onBlur()}
    />
  );
};
