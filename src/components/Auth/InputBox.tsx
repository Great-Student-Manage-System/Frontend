import { ButtonProperty, ChangeValue } from "@pages/Auth/Signup";
import styled from "styled-components";
import ConfirmButton from "@components/Auth/ConfirmButton";
import { useState } from "react";

const InputBoxContainer = styled.div`
  margin: 0 auto;
  width: inherit;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  max-width: var(--auth-content-width);
  min-width: 296px;
  height: 42px;
  width: 100%;
`;

const TitleLabel = styled.label`
  display: block;
`;

interface InputProps {
  title?: string;
  value: string;
  changeHandler: ({ e, fnc }: ChangeValue) => void;
  changeFunction: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  buttonProperty?: ButtonProperty;
}

function InputBox({
  title,
  placeholder,
  buttonProperty,
  changeHandler,
  changeFunction,
  value,
}: InputProps) {
  const [isValidation, setIsValidation] = useState<boolean>(false);
  return (
    <InputBoxContainer>
      {title ? <TitleLabel>{title}</TitleLabel> : null}
      <InputContainer>
        <Input
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            changeHandler({ e, fnc: changeFunction });
            setIsValidation(e.currentTarget.value.length > 8);
          }}
        />
        {buttonProperty ? (
          <ConfirmButton
            buttonTitle={buttonProperty.buttonTitle}
            buttonHandler={buttonProperty.buttonHandler}
            isValidation={isValidation}
          ></ConfirmButton>
        ) : null}
      </InputContainer>
    </InputBoxContainer>
  );
}

export default InputBox;
