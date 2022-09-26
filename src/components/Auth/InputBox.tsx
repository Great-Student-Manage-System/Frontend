import { inputValidateHandler } from "@pages/Auth/Signup";
import styled from "styled-components";
import { useState } from "react";
import {
  emailValidation,
  nickNameValidation,
  passwordValidation,
} from "@utility/validation";

import { FieldValues, UseFormRegister } from "react-hook-form/dist/types";

type inputType = "email" | "password" | "nickName";

interface InputProps {
  placeholder?: string;
  inputType: inputType;
  register: UseFormRegister<FieldValues>;
}

const getValidation = (type: string) => {
  if (type === "email") return emailValidation;
  else if (type === "password") return passwordValidation;
  else if (type === "nickName") return nickNameValidation;
};

function InputBox({ placeholder, inputType, register }: InputProps) {
  const [isValidation, setIsValidation] = useState<boolean>(false);
  return (
    <InputWrap>
      <Input
        placeholder={placeholder}
        // onChange={(e) => {
        //   inputValidateHandler({
        //     changeArguments: { e, fnc: setInputValue },
        //     validation: getValidation(inputType),
        //     setValidValue: setIsValidation,
        //   });
        // }}
        type={inputType === "nickName" ? "text" : inputType}
        {...(register(inputType), { validate: getValidation(inputType) })}
      />
      {isValidation ? null : <span>올바른 input을 입력하세요</span>}
    </InputWrap>
  );
}

export default InputBox;

const InputWrap = styled.div`
  width: 100%;
`;

const Input = styled.input`
  max-width: var(--auth-content-width);
  min-width: 296px;
  height: 42px;
  width: 100%;
`;
