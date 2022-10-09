import {
  KAKAO_AUTH_URL,
  REST_API_KEY,
  REDIRECT_URI,
  CLIENT_SECRET,
} from "@data/kakaoLogin";
import KaKaoLoginImage from "@images/kakao_login_large_wide.png";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function KaKaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

  const bodyProps = {
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: KAKAO_CODE,
    client_secret: CLIENT_SECRET,
  };

  const getKaKaoToken = () => {
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: JSON.stringify(bodyProps),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, bodyProps);
      });
  };

  const loginClickHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    if (!location.search) return;
    getKaKaoToken();
  }, []);

  return <KaKaoLoginButton onClick={loginClickHandler} />;
}

export default KaKaoLogin;

export const LoginWayButton = styled.button`
  width: var(--auth-content-width);
  height: 5.6rem;
  margin: 1.6rem auto;
  border-radius: 0.6rem;
`;

const KaKaoLoginButton = styled(LoginWayButton)`
  border: none;
  background-image: url(${KaKaoLoginImage});
  background-size: var(--auth-content-width);
  background-repeat: no-repeat;
`;
