import React from "react";
import styled from "styled-components";
import { VscAccount } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as LogoImg } from "@images/logo-type.svg";
import { loginStateAtom } from "@recoil/atom";
import { useRecoilValue } from "recoil";

interface signButtonProps {
  isPrimaryBg: boolean;
}

const Base = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
`;

const List = styled.ul`
  margin: 0 auto;
  width: 85%;
  height: 100%;
  padding: 0;
  display: flex;
`;

const Left = styled.li`
  display: flex;
  align-items: center;
  height: 50px;
  flex-shrink: 0;
  &:not(:first-child) {
    margin: 0 0 0 10px;
  }
`;

const Right = styled.li`
  display: flex;
  align-items: center;
  height: 50px;
  flex-shrink: 1;
  margin: 0 0 0 auto;
`;

const Logo = styled.button`
  font-size: 18px;
  cursor: pointer;
  border: none;
  background: none;
`;

const Sign = styled.button<signButtonProps>`
  border-radius: 6px;
  font-weight: 1000;
  box-sizing: border-box;
  min-width: 60px;
  height: 30px;

  background: ${(props) => (props.isPrimaryBg ? "#FFFFFF" : "#319CEA")};
  color: ${(props) => (props.isPrimaryBg ? "#319CEA" : "#FFFFFF")};

  font-size: 12px;
  border: ${(props) => (props.isPrimaryBg ? "1.5px solid #319CEA" : "none")};
  cursor: pointer;
  margin: 10px 5px 10px 15px;
`;

function Header() {
  const location = useLocation();
  const loginState = useRecoilValue(loginStateAtom);
  return location.pathname.includes("auth") ? null : loginState ? (
    <>
      {/* 로그인 됐을때 */}
      <Base>
        <List>
          <Left>
            <Link to="/">
              <Logo>
                <LogoImg />
              </Logo>
            </Link>
          </Left>
          <Right>
            <Link to="/mypage/account">
              <VscAccount size={22} color="#696969" />
            </Link>
            <Link to="/">
              <Sign isPrimaryBg={false}>로그아웃</Sign>
            </Link>
          </Right>
        </List>
      </Base>
    </>
  ) : (
    <>
      {/* 로그인 안됐을때 */}
      <Base>
        <List>
          <Left>
            <Link to="/">
              <Logo>
                <LogoImg />
              </Logo>
            </Link>
          </Left>
          <Right hidden>
            <Link to="/auth/login">
              <Sign isPrimaryBg={true}>로그인</Sign>
            </Link>
            <Link to="/auth/signup">
              <Sign isPrimaryBg={false}>회원가입</Sign>
            </Link>
          </Right>
        </List>
      </Base>
    </>
  );
}

export default Header;
