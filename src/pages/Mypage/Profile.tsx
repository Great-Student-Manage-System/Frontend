import React, { ChangeEvent } from "react";
import Header from "@components/Main/Header";
import Navigation from "@components/Main/Navigation";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { myInfoSelector, inputState } from "@recoil/myInfoRecoil";
import { getLocalStorageValue } from "@utility/storage";

const Wrapper = styled.div`
  position: relative;
  top: 140px;
  left: 80px;
  display: block;
`;
const Title = styled.div`
  position: absolute;
  font-size: 16px;
  font-weight: bold;
`;
const NameList = styled.div`
  top: 50px;
  position: relative;
  display: block;
`;
const Text = styled.p`
  position: absolute;
  width: 100px;
  font-size: 15px;
`;
const Name = styled.input`
  position: absolute;
  top: 45px;
  width: 200px;
  height: 30px;
  border-radius: 6px;
  border: solid 1px #bdbdbd;
  padding: 10px;
`;
const SubList = styled.div`
  top: 125px;
  position: relative;
  display: block;
`;
const Subject = styled.div`
  position: absolute;
  top: 45px;
  font-size: 13px;
  width: 200px;
  height: 30px;
  border-radius: 6px;
  border: solid 1px #bdbdbd;
  padding: 6px 8px;
`;

const Save = styled.button`
  position: absolute;
  top: 220px;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 35px;
  font-weight: 600;
  background: #319cea;
  color: rgb(255, 255, 255);
  font-size: 12px;
  border: none;
  cursor: pointer;
`;

function MyInfo(nickName: string) {
  const BASE_URL = "https://great.robinjoon.xyz";
  const accessToken = getLocalStorageValue("token") ?? "";

  fetch(`${BASE_URL}/api/members/myinfo`, {
    method: "PATCH",
    headers: {
      Authorization: accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      nickName: nickName,
    }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));

  console.log(nickName);
}

export default function Profile() {
  const [nickName, setNickName] = useRecoilState<string>(inputState);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };
  const myInfo = useRecoilValue(myInfoSelector);
  console.log(myInfo);

  return (
    <div>
      <Header />
      <Navigation />
      <Wrapper>
        <Title>프로필 정보</Title>
        <NameList>
          <Text>닉네임</Text>
          <Name
            type="text"
            placeholder={myInfo.nickName}
            value={nickName}
            onChange={onChange}
          />
        </NameList>
        <SubList>
          <Text>담당과목</Text>
          <Subject>{myInfo.subject}</Subject>
        </SubList>
        <Save onClick={() => MyInfo(nickName)}>변경내용 저장</Save>
      </Wrapper>
    </div>
  );
}
