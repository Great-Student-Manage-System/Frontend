import Layout from "@components/Auth/Layout";
import Header from "@components/Auth/Header";
import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "@components/Auth/InputBox";
import { useRecoilValue } from "recoil";
import { signUpConditionAtom, signUpConditionProps } from "@recoil/atom";
import ConfirmButton from "@components/Auth/ConfirmButton";
import { useForm } from "react-hook-form";
import {
  emailValidation,
  passwordValidation,
  nickNameValidation,
} from "@utility/validation";
import { MAIN_SUBJECTS, DETAIL_SUBJECTS } from "@data/subjectData";
import dayjs from "dayjs";
import { useEffect } from "react";

const CONFIRM_TIME = 300;

export interface ConfirmButtonProps {
  buttonTitle: string;
  buttonHandler: (e: React.MouseEvent) => void;
  isValidation?: boolean;
}

export interface ChangeValue {
  e: React.ChangeEvent<HTMLInputElement>;
  fnc: React.Dispatch<React.SetStateAction<string>>;
}

export interface ValidateChangeProps {
  changeArguments: ChangeValue;
  validation?: (string: string) => boolean;
  setValidValue?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const inputChangeHandler = ({ e, fnc }: ChangeValue): void => {
  const { value } = e.currentTarget;
  fnc(value);
};

// 관심사의 분리가 필요.
// 해당 값들을 한번에 처리할 submit 장치가 필요함.
// react hook form 사용하긴 함.

export const inputValidateHandler = ({
  changeArguments,
  validation,
  setValidValue,
}: ValidateChangeProps) => {
  const { e, fnc } = changeArguments;
  inputChangeHandler({ e, fnc });
  if (validation && setValidValue) {
    setValidValue(validation(e.currentTarget.value));
  }
};

export default function Signup() {
  const { register, handleSubmit, formState } = useForm();

  const [emailValue, setemailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rePasswordValue, setRePasswordValue] = useState("");
  const [nickNameValue, setNickNameValue] = useState("");
  const [mainSubject, setMainSubject] = useState(-1);
  const [subjectValue, setSubjectValue] = useState<{ [key: string]: string }>(
    {},
  );
  const [confirmTime, setConfirmTime] = useState(CONFIRM_TIME);

  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isEmailConfirmInput, setIsEmailConfirmInput] = useState(false);
  const [isPasswordValidate, setIsPasswordValidate] = useState(false);
  const [isRePasswordValidate, setIsRePasswordValidate] = useState(false);
  const [isNickNameValidate, setIsNickNameValidate] = useState(false);

  const emailConfirmProperty = {
    buttonTitle: "인증하기",
    buttonHandler: (e: React.MouseEvent) => {
      e.preventDefault();
      setIsEmailConfirmInput(isEmailValidate);
    },
  };
  const nickNameConfirmProperty = {
    buttonTitle: "중복확인",
    buttonHandler: (e: React.MouseEvent) => {
      e.preventDefault();
    },
  };

  const signUpSubmitHandler = (data: any) => {
    // 여기서 submit 처리
    console.log(data, formState);
  };

  useEffect(() => {
    if (isEmailConfirmInput && confirmTime > 0 && isEmailValidate) {
      const timer = setInterval(() => {
        setConfirmTime((cur) => --cur);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [confirmTime, isEmailConfirmInput, isEmailValidate]);

  return (
    <>
      <Header title={"회원가입"} />
      <AuthForm onSubmit={handleSubmit(signUpSubmitHandler)}>
        <TitleLabel>이메일</TitleLabel>
        <InputBoxContainer>
          <InputContainer>
            <InputWrap>
              <Input
                placeholder="이메일을 입력해주세요"
                type="email"
                {...register("email", {
                  onChange: (e) => {
                    const { value } = e.target;
                    setemailValue(value);
                    setIsEmailValidate(emailValidation(value));
                  },
                  value: emailValue,
                  required: true,
                })}
              />
              {isEmailValidate || emailValue.length === 0 ? null : (
                <span>올바른 이메일 형식을 입력하세요</span>
              )}
            </InputWrap>
            <ConfirmButton
              isValidation={isEmailValidate}
              buttonTitle={emailConfirmProperty.buttonTitle}
              buttonHandler={emailConfirmProperty.buttonHandler}
            ></ConfirmButton>
          </InputContainer>
        </InputBoxContainer>

        {isEmailConfirmInput && isEmailValidate ? (
          <>
            <TitleLabel>인증코드</TitleLabel>
            <InputBoxContainer>
              <InputContainer>
                <Input type="number" placeholder="인증코드를 입력해주세요" />
                <div>{dayjs((confirmTime || 0) * 1000).format("mm:ss")}</div>
              </InputContainer>
            </InputBoxContainer>
          </>
        ) : null}

        <InputBoxContainer>
          <TitleLabel>비밀번호</TitleLabel>
          <InputContainer>
            <InputWrap>
              <Input
                placeholder="비밀번호를 입력해주세요"
                type="password"
                {...register("password", {
                  onChange: (e) => {
                    const { value } = e.target;
                    setPasswordValue(value);
                    setIsPasswordValidate(passwordValidation(value));
                  },
                  value: passwordValue,
                  required: true,
                })}
              />
              {isPasswordValidate || passwordValue.length === 0 ? null : (
                <span>
                  비밀번호는 특수문자,알파벳,숫자를 포함한 8~15자의 문자입니다.
                </span>
              )}
            </InputWrap>
          </InputContainer>
        </InputBoxContainer>

        <InputBoxContainer>
          <TitleLabel>비밀번호 확인</TitleLabel>
          <InputContainer>
            <InputWrap>
              <Input
                placeholder="다시한번 비밀번호를 입력해주세요"
                type="password"
                {...register("rePassword", {
                  onChange: (e) => {
                    const { value } = e.target;
                    setRePasswordValue(value);
                    setIsRePasswordValidate(passwordValue === e.target.value);
                  },
                  value: rePasswordValue,
                  required: true,
                })}
              />
              {isRePasswordValidate || rePasswordValue.length === 0 ? null : (
                <span>비밀번호와 같지 않습니다.</span>
              )}
            </InputWrap>
          </InputContainer>
        </InputBoxContainer>

        <InputBoxContainer>
          <TitleLabel>닉네임</TitleLabel>
          <InputContainer>
            <InputWrap>
              <Input
                placeholder="닉네임을 입력해주세요"
                {...register("nickName", {
                  onChange: (e) => {
                    const { value } = e.target;
                    setNickNameValue(nickNameValue);
                    setIsNickNameValidate(nickNameValidation(value));
                  },
                  required: true,
                  value: nickNameValue,
                })}
              />
              {isNickNameValidate || nickNameValue.length === 0 ? null : (
                <span>올바른 닉네임을 입력하세요</span>
              )}
            </InputWrap>
            <ConfirmButton
              isValidation={isNickNameValidate}
              buttonTitle={nickNameConfirmProperty.buttonTitle}
              buttonHandler={nickNameConfirmProperty.buttonHandler}
            ></ConfirmButton>
          </InputContainer>
        </InputBoxContainer>

        <TitleLabel>담당 과목</TitleLabel>
        <InputBoxContainer>
          <InputContainer>
            <select
              onChange={(e) => setMainSubject(Number(e.target.value))}
              required={true}
            >
              <option hidden={true}>과목을 선택해주세요</option>
              <option value={MAIN_SUBJECTS.국어}>국어</option>
              <option value={MAIN_SUBJECTS.수학}>수학</option>
              <option value={MAIN_SUBJECTS.사회}>사회</option>
              <option value={MAIN_SUBJECTS.과학}>과학</option>
            </select>
            {mainSubject !== -1 ? (
              <select
                onChange={(e) =>
                  setSubjectValue({
                    [mainSubject]: e.target.value,
                  })
                }
                required={true}
              >
                <option hidden={true}>상세과목을 선택해주세요</option>
                {DETAIL_SUBJECTS[mainSubject as MAIN_SUBJECTS].map((detail) => (
                  <option value={detail}>{detail}</option>
                ))}
              </select>
            ) : null}
          </InputContainer>
        </InputBoxContainer>

        <button
          type="submit"
          // disabled={
          //   !signUpCondition.email ||
          //   !signUpCondition.nickName ||
          //   !isPasswordValidate ||
          //   !signUpCondition.subject
          // }
        >
          동의하고 회원가입하기
        </button>
        <InfoSpan>
          <a>이용약관</a>과 <a>개인정보 수집이용</a>에 동의하며, 만 14세
          이상입니다.
        </InfoSpan>
      </AuthForm>
    </>
  );
}

export const AuthForm = styled.form`
  display: grid;
  width: var(--auth-content-width);
  margin: 0 auto;
`;

const InfoSpan = styled.span`
  font-size: 1.2rem;
  a {
    font-weight: bold;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`;

const TitleLabel = styled.label`
  display: block;
`;

const InputBoxContainer = styled.div`
  margin: 0 auto;
  width: inherit;
`;

const InputContainer = styled.div`
  display: flex;
  /* align-items: center; */
`;

const InputWrap = styled.div`
  width: 100%;
`;

const Input = styled.input`
  max-width: var(--auth-content-width);
  min-width: 296px;
  height: 42px;
  width: 100%;
`;
