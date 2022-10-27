import Header from "@components/Auth/Header";
import React, { useState } from "react";
import styled from "styled-components";
import ConfirmButton from "@components/Auth/ConfirmButton";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "@utility/validation";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { userInfoProps } from "@utility/types";
import {
  sendEmailConfirmNumber,
  signUpFetcher,
  confirmEmailNumber,
  checkNickName,
} from "@apis/api";
import { useNavigate } from "react-router-dom";
import { MAIN_SUBJECTS } from "@data/subjectData";

const CONFIRM_TIME = 300;

export default function Signup() {
  const { register, handleSubmit } = useForm<userInfoProps>();

  const navigation = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [emailConfirmValue, setEmailConfirmValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rePasswordValue, setRePasswordValue] = useState("");
  const [nickNameValue, setNickNameValue] = useState("");
  const [subject, setSubject] = useState("");

  const [nickNameStatus, setNickNameStatus] = useState<{
    code: number;
    message: string;
  } | null>(null);

  const [confirmTime, setConfirmTime] = useState(CONFIRM_TIME);

  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isEmailConfirmInput, setIsEmailConfirmInput] = useState(false);
  const [isPasswordValidate, setIsPasswordValidate] = useState(false);
  const [isRePasswordValidate, setIsRePasswordValidate] = useState(false);
  const [isNickNameValidate, setIsNickNameValidate] = useState(false);
  const [isSubjectValidate, setIsSubjectValidate] = useState(false);
  const [isConfirmedEmail, setIsConfirmedEmail] = useState(false);

  const sendEmailProperty = {
    buttonTitle: "전송하기",
    buttonHandler: (e: React.MouseEvent) => {
      e.preventDefault();
      sendEmailConfirmNumber(emailValue)
        .then((data) => {
          if (data.code === 200) setIsEmailConfirmInput(true);
          else alert(data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };

  const nickNameMessage = useMemo(() => {
    return nickNameStatus !== null ? (
      <WarningSpan>{nickNameStatus.message}</WarningSpan>
    ) : null;
  }, [nickNameStatus]);

  const nickNameConfirmProperty = {
    buttonTitle: "중복확인",
    buttonHandler: async (e: React.MouseEvent) => {
      e.preventDefault();
      const data = await checkNickName(nickNameValue);
      setNickNameStatus({
        code: data.code,
        message: data.message ?? data.response,
      });
    },
  };

  const confirmEmailProperty = {
    buttonTitle: "확인하기",
    buttonHandler: (e: React.MouseEvent) => {
      e.preventDefault();
      confirmEmailNumber(emailValue, emailConfirmValue)
        .then((data) => {
          if (data.code === 200) {
            alert(data.response);
            setConfirmTime(CONFIRM_TIME);
            setIsEmailConfirmInput(false);
            setIsConfirmedEmail(true);
          } else {
            alert(data.message);
          }
        })
        .finally(() => setEmailConfirmValue(""));
    },
  };

  const signUpSubmitHandler = (data: userInfoProps) => {
    // 여기서 submit 처리
    const { email, password, nickName, subject } = data;

    signUpFetcher({ email, password, nickName, subject })
      .then((data) => {
        if (data.code !== 200) {
          alert(data.message);
        } else {
          alert(data.response);
          navigation("/auth/login");
        }
      })
      .catch((error) => alert(error.message));
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
                    setEmailValue(value);
                    setIsEmailValidate(emailValidation(value));
                    setIsConfirmedEmail(false);
                  },
                  value: emailValue,
                  required: true,
                })}
              />
              {isEmailValidate || emailValue.length === 0 ? null : (
                <WarningSpan>올바른 이메일 형식을 입력하세요</WarningSpan>
              )}
            </InputWrap>
            <ConfirmButton
              isValidation={isEmailValidate}
              buttonTitle={sendEmailProperty.buttonTitle}
              buttonHandler={sendEmailProperty.buttonHandler}
            ></ConfirmButton>
          </InputContainer>
        </InputBoxContainer>

        {isEmailConfirmInput && isEmailValidate ? (
          <>
            <TitleLabel>인증코드</TitleLabel>
            <InputBoxContainer>
              <InputContainer>
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Input
                    type="number"
                    placeholder="인증코드를 입력해주세요"
                    value={emailConfirmValue}
                    onChange={(e) => {
                      const { value } = e.target;
                      setEmailConfirmValue(value);
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      right: 0,
                      margin: "1rem",
                    }}
                  >
                    {dayjs((confirmTime || 0) * 1000).format("mm:ss")}
                  </div>
                </div>
                <ConfirmButton
                  buttonTitle={confirmEmailProperty.buttonTitle}
                  buttonHandler={confirmEmailProperty.buttonHandler}
                ></ConfirmButton>
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
                <WarningSpan>
                  비밀번호는 특수문자,알파벳,숫자를 포함한 8~20자의 문자입니다.
                </WarningSpan>
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
                <WarningSpan>비밀번호와 같지 않습니다.</WarningSpan>
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
                    setNickNameValue(value);
                    setIsNickNameValidate(value.length);
                    setNickNameStatus(null);
                  },
                  required: true,
                  value: nickNameValue,
                })}
              />
              {nickNameMessage}
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
          <SelectContainer>
            <SubjectSelect
              {...register("subject", {
                onChange: (e) => {
                  setSubject(e.target.value);
                  setIsSubjectValidate(true);
                },
                required: true,
              })}
            >
              <option hidden={true}>과목</option>
              {(
                Object.keys(MAIN_SUBJECTS) as Array<keyof typeof MAIN_SUBJECTS>
              ).map((subject) => (
                <option value={MAIN_SUBJECTS[subject]}>{subject}</option>
              ))}
            </SubjectSelect>
          </SelectContainer>
        </InputBoxContainer>

        <SignUpButton
          type="submit"
          disabled={
            !isPasswordValidate ||
            !isRePasswordValidate ||
            !isSubjectValidate ||
            !isConfirmedEmail ||
            nickNameStatus?.code !== 200
          }
        >
          동의하고 회원가입하기
        </SignUpButton>
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
  margin: 0 auto 6rem auto;
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
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  /* identical to box height, or 171% */

  letter-spacing: -0.25px;

  color: #000000;
`;

const InputBoxContainer = styled.div`
  margin: 0 auto;
  width: inherit;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
  /* align-items: center; */
`;

const SelectContainer = styled(InputContainer)``;

const InputWrap = styled.div`
  width: 100%;
`;

const Input = styled.input`
  max-width: var(--auth-content-width);
  min-width: 29.6rem;
  height: 4.2rem;
  width: 100%;
  /* secondary/white */

  background: #ffffff;
  /* gray/lightgray */

  border: 0.1rem solid var(--grey);
  border-radius: 0.6rem;

  padding: 0 1.2rem;
`;

const SubjectSelect = styled.select`
  padding: 0.8rem 1.2rem;
  /* secondary/white */
  min-width: 9.2rem;
  /* Gray 4 */
  background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23212121' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")
    no-repeat right 8px center;
  border: 0.1rem solid var(--grey);
  border-radius: 0.6rem;

  margin: 0 0.4rem;
`;

const SignUpButton = styled.button`
  width: 37.6rem;
  height: 5.6rem;

  /* gray/lightgray */
  margin: 1.6rem 0 0.8rem 0;

  background: ${(props) => (props.disabled ? "#BDBDBD" : "#319CEA")};

  border-radius: 0.6rem;

  color: #fff;
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;

  border: none;
`;

const WarningSpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #f36868;
`;
