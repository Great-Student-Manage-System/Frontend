import GoogleLogin from "react-google-login";
import { LoginWayButton } from "./KaKaoLogin";
import styled from "styled-components";
import { ReactComponent as GoogleLogo } from "@images/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg";

function GoogleLoginButton() {
  const onSuccessHandler = (response: any) => {
    console.log(response);
    const params = new URLSearchParams();
    params.append("idToken", response.tokenObj.id_token);

    const googleLogin = async () => {
      const res = await fetch("요청 주소", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(params),
      });

      // localStorage.setItem("accessToken", res.data.token.access);
      // localStorage.setItem("refreshToken", res.data.token.refresh);
    };
    googleLogin();
  };

  const onFailureHandler = (response: any) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      style={{ padding: "0px" }}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
      onSuccess={onSuccessHandler}
      onFailure={onFailureHandler}
      cookiePolicy="single_host_origin"
      render={(render) => (
        <GoogleLoginContainer onClick={render.onClick}>
          <GoogleLoginWrapper>
            <GoogleLogo />
            <GoogleLoginSpan>구글로 로그인하기</GoogleLoginSpan>
          </GoogleLoginWrapper>
        </GoogleLoginContainer>
      )}
    />
  );
}

export default GoogleLoginButton;

const GoogleLoginContainer = styled(LoginWayButton)`
  border: 1.5px solid #bdbdbd;
  background-color: #ffffff;
  &:hover {
    opacity: 0.5;
  }
`;

const GoogleLoginWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const GoogleLoginSpan = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.4rem;
  width: 296px;
`;
