export const emailValidation = (email: string): boolean => {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};

export const passwordValidation = (password: string): boolean => {
  // 8~15자 특수문자 / 문지/ 숫자 포함
  const regExp =
    /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()+|=]).*$/;
  return regExp.test(password);
};
