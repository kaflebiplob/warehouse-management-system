import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Table from "../common/Table";
import Spinner from "../common/Spinner";
import PageHeader from "../common/PageHeader";
import PageWrapper from "../common/PageWrapper";
import axiosInstance from "../axiosInstance";

const Customers = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const dataHeadings = ["Firstname", "Lastname", "Email"];

  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .get("/api/v1/customers/all")
      .then((res) => {
        if (!isMounted) return;
        setDataList([...res.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("[Customers] failed to load customers:", err);
        if (isMounted) {
          setError("Could not load customers.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      <PageWrapper>
        <PageHeader icon="fe-user" title="Customers" />
        {isLoading ? (
          <Spinner label="Loading customers…" />
        ) : error ? (
          <div
            style={{ textAlign: "center", color: "#e5484d", padding: "2rem" }}
          >
            {error}
          </div>
        ) : (
          <Table data={dataHeadings} list={dataList} />
        )}
      </PageWrapper>
    </>
  );
};

export default Customers;
