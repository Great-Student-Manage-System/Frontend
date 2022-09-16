import React from "react";
import styled from "styled-components";
import { VscAccount } from "react-icons/vsc";

const Base = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 0px 0px;
`;

const List = styled.ul`
  margin: 0 auto;
  max-width: 85%;
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

const Link = styled.a`
  text-decoration: none;
`;

const Logo = styled.button`
  font-size: 18px;
  cursor: pointer;
  border: none;
  background: none;
`;

const Sign = styled.button`
  border-radius: 6px;
  font-weight: 1000;
  box-sizing: border-box;
  min-width: 60px;
  height: 30px;
  background: #319cea;
  color: rgb(255, 255, 255);
  font-size: 12px;
  border: none;
  cursor: pointer;
  margin: 10px 5px 10px 15px;
`;

function Header() {
  return (
    <>
      <Base>
        <List>
          <Left>
            <Link href="/">
              <Logo>grea+</Logo>
            </Link>
          </Left>
          <Right>
            <Link href="/mypage">
              <VscAccount size={22} color="#696969" />
            </Link>
            <Link href="/">
              <Sign>로그아웃</Sign>
            </Link>
          </Right>
        </List>
      </Base>
    </>
  );
}

export default Header;
