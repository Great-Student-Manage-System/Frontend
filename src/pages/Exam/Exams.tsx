import Header from "@components/Main/Header";
import React from "react";
import Navigation from "@components/Main/Navigation";
import SearchForm from "@components/Main/SearchForm";
import Table from "@components/Table/Table";

export default function Exams() {
  return (
    <>
      <Header />
      <Navigation />
      <SearchForm />
      <Table />
    </>
  );
}
