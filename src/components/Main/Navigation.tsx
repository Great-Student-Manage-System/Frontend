import React from "react";
import styled from "styled-components";
import { Link as ReactRouterDomLink, useLocation } from "react-router-dom";

const Link = ({ isActive, children, ...props }: any) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 45px;
  top: 55px;
  left: 0;
`;

const List = styled.ul`
  display: flex;
  margin: auto;
  height: 100%;
  max-width: 85%;
  line-height: 45px;
  padding: 0px;
`;

const Now = styled.li`
  height: 45px;
  font-size: 15px;
  font-weight: bold;
  list-style: none;
  margin-right: 80px;
`;

const Menu = styled(Link)`
  text-align: center;
  width: 80px;
  cursor: pointer;
  margin-left: 20px;
  font-size: 14px;

  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  border-bottom: ${(props) => (props.isActive ? "2px solid" : "none")};
`;

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <>
      <Nav
        hidden={
          pathname === "/mypage/account" || pathname === "/mypage/profile"
        }
      >
        <List>
          <Now>성적관리</Now>
          <Menu to="/students" isActive={pathname === "/students"}>
            학생
          </Menu>
          <Menu to="/exams" isActive={pathname === "/exams"}>
            시험
          </Menu>
        </List>
      </Nav>
      <Nav
        hidden={
          pathname === "/students" || pathname === "/exams" || pathname === "/"
        }
      >
        <List>
          <Now>마이페이지</Now>
          <Menu to="/mypage/account" isActive={pathname === "/mypage/account"}>
            계정
          </Menu>
          <Menu to="/mypage/profile" isActive={pathname === "/mypage/profile"}>
            프로필
          </Menu>
        </List>
      </Nav>
    </>
  );
}
