import Header from "@components/Main/Header";
import styled from "styled-components";
import Navigation from "@components/Main/Navigation";
import SearchForm from "@components/Main/SearchForm";
import Table from "@components/Table/Table";
import useMyInfo from "@hooks/useMyInfo";
import { useSetRecoilState } from "recoil";
import { myInfoAtom } from "@recoil/myInfoatom";
import { useEffect } from "react";

import { DETAIL_SUBJECTS, MAIN_SUBJECTS } from "@data/subjectData";
import AuthLayout from "@components/layouts/AuthLayout";
import { getLocalStorageValue, removeLocalStorage } from "@utility/storage";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "@apis/api";

export default function Students() {
  const { myInfo } = useMyInfo();
  const setMyInfo = useSetRecoilState(myInfoAtom);
  const navigation = useNavigate();

  useEffect(() => {
    if (myInfo?.code === 200) {
      const { data } = myInfo;
      setMyInfo({
        ...data,
        subSubjects:
          DETAIL_SUBJECTS[data.subject as keyof typeof MAIN_SUBJECTS],
      });
    }
  }, [myInfo]);

  return (
    <AuthLayout>
      <Header />
      <Navigation />
      <SearchForm />
      <Table />
    </AuthLayout>
  );
}
