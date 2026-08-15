// src/Pages/ProductsPage.js
import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Table from "../common/Table";
import Spinner from "../common/Spinner";
import PageHeader from "../common/PageHeader";

const ProductsPage = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const dataHeadings = ["Name", "Quantity", "Sku"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/products/all")
      .then((res) => res.json())
      .then((data) => {
        setProductsList([...data]);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load products.");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <PageHeader icon="fe-tag" title="Products" />
      {isLoading ? (
        <Spinner label="Loading products…" />
      ) : error ? (
        <div style={{ textAlign: "center", color: "#e5484d", padding: "2rem" }}>
          {error}
        </div>
      ) : (
        <Table data={dataHeadings} list={productsList} />
      )}
    </>
  );
};

export default ProductsPage;
