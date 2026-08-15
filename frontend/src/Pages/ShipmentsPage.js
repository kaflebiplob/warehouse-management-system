// src/Pages/ShipmentsPage.js
import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Table from "../common/Table";
import Spinner from "../common/Spinner";
import PageHeader from "../common/PageHeader";
import PageWrapper from "../common/PageWrapper";

const ShipmentsPage = () => {
  const [shipmentsList, setShipmentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const dataHeadings = ["Destination", "Quantity", "Product"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/shipments/all")
      .then((res) => res.json())
      .then((data) => {
        setShipmentsList([...data]);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load shipments.");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <PageWrapper>
        <PageHeader icon="fe-truck" title="Shipments" />
        {isLoading ? (
          <Spinner label="Loading shipments…" />
        ) : error ? (
          <div
            style={{ textAlign: "center", color: "#e5484d", padding: "2rem" }}
          >
            {error}
          </div>
        ) : (
          <Table data={dataHeadings} list={shipmentsList} />
        )}
      </PageWrapper>
    </>
  );
};

export default ShipmentsPage;
