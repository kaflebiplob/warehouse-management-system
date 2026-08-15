// src/Pages/Customers.js
import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Table from "../common/Table";
import Spinner from "../common/Spinner";
import PageHeader from "../common/PageHeader";

const Customers = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const dataHeadings = ["Firstname", "Lastname", "Email"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/customers/all")
      .then((res) => res.json())
      .then((data) => {
        setDataList([...data]);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load customers.");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <PageHeader icon="fe-user" title="Customers" />
      {isLoading ? (
        <Spinner label="Loading customers…" />
      ) : error ? (
        <div style={{ textAlign: "center", color: "#e5484d", padding: "2rem" }}>
          {error}
        </div>
      ) : (
        <Table data={dataHeadings} list={dataList} />
      )}
    </>
  );
};

export default Customers;
