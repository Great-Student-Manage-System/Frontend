import Header from "@components/Main/Header";
import styled from "styled-components";
import Navigation from "@components/Main/Navigation";
import SearchForm from "@components/Main/SearchForm";
import Table from "@components/Table/Table";

import Modal from "@components/Modal/Modal";
import Overlay from "@components/Modal/Overlay";
import AppendStudentModal from "@components/Modal/AppendStudentModal";

export default function Students() {
  return (
    <>
      <Header />
      <Navigation />
      <SearchForm />
      <Table />
    </>
  );
}
