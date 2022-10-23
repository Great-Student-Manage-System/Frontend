import Header from "@components/Main/Header";
import styled from "styled-components";
import Navigation from "@components/Main/Navigation";
import SearchForm from "@components/Main/SearchForm";
import Table from "@components/Table/Table";

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
