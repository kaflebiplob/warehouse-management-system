import React, { useState } from "react";
import Header from "../common/Header";
import PageHeader from "../common/PageHeader";
import FormField, { inputStyle } from "../common/FormField";
import Button from "../common/Button";
import { colors } from "../theme";
import PageWrapper from "../common/PageWrapper";

const CreateProductPage = () => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    sku: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSuccess(true);
      setForm({ name: "", quantity: "", price: "", sku: "" });
    } catch (err) {
      setError("Could not create product. Check the details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <PageWrapper>
      <PageHeader icon="fe-tag" title="Add a product" />

      <div
        style={{ maxWidth: 480, margin: "0 auto", padding: "0 1.5rem 3rem" }}
      >
        <form onSubmit={handleSubmit}>
          {success && (
            <div
              style={{
                background: "#35c4a11a",
                border: `1px solid ${colors.teal}44`,
                color: colors.teal,
                borderRadius: 6,
                padding: "0.6rem 0.75rem",
                fontSize: "0.85rem",
                marginBottom: "1.1rem",
              }}
            >
              Product created.
            </div>
          )}
          {error && (
            <div
              style={{
                background: "#e5484d1a",
                border: `1px solid ${colors.danger}44`,
                color: colors.danger,
                borderRadius: 6,
                padding: "0.6rem 0.75rem",
                fontSize: "0.85rem",
                marginBottom: "1.1rem",
              }}
            >
              {error}
            </div>
          )}

          <FormField label="Product name" htmlFor="id_name">
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              id="id_name"
            />
          </FormField>

          <FormField label="Product quantity" htmlFor="id_quantity">
            <input
              type="number"
              name="quantity"
              required
              value={form.quantity}
              onChange={handleChange}
              style={inputStyle}
              id="id_quantity"
            />
          </FormField>

          <FormField label="Unit price" htmlFor="id_price">
            <input
              type="number"
              step="0.01"
              name="price"
              required
              value={form.price}
              onChange={handleChange}
              style={inputStyle}
              id="id_price"
            />
          </FormField>

          <FormField label="Stock keeping unit" htmlFor="id_sku">
            <input
              type="text"
              name="sku"
              maxLength={50}
              required
              value={form.sku}
              onChange={handleChange}
              style={inputStyle}
              id="id_sku"
            />
          </FormField>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Create product"}
          </Button>
        </form>
      </div>
      </PageWrapper>
    </>
  );
};

export default CreateProductPage;
