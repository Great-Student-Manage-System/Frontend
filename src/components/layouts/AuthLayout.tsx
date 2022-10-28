import { getLocalStorageValue } from "@utility/storage";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { removeLocalStorage } from "@utility/storage";
import { useSetRecoilState } from "recoil";
import { loginStateAtom } from "@recoil/atom";

function AuthLayout({ children }: PropsWithChildren) {
  const accessToken = getLocalStorageValue("token");
  const setLoginState = useSetRecoilState(loginStateAtom);
  const navigation = useNavigate();

  useEffect(() => {
    if (accessToken === null) {
      setLoginState(false);
      removeLocalStorage("token");
      alert("토큰이 존재하지 않습니다.\n로그인페이지로 이동합니다.");
      navigation("/auth/login");
    }
  }, [accessToken]);
  return <>{children}</>;
}

export default AuthLayout;
