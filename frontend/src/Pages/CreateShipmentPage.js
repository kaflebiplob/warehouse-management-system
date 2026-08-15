import React, { useState } from "react";
import Header from "../common/Header";
import PageHeader from "../common/PageHeader";
import FormField, { inputStyle } from "../common/FormField";
import Button from "../common/Button";
import { colors } from "../theme";

const customers = [
  { id: 1, name: "Kwame Mensah" },
  { id: 2, name: "Desmond Nyamador" },
  { id: 3, name: "Ama Serwah" },
  { id: 4, name: "Nana Osei" },
  { id: 5, name: "Naa Laryea" },
];

const products = [
  { id: 4, name: "Brown Leather Shoes" },
  { id: 5, name: "LG 23' OLED Monitor" },
  { id: 6, name: "Samsung Z Flip" },
  { id: 10, name: "Samsung Aa30" },
];

const CreateShipmentPage = () => {
  const [form, setForm] = useState({
    customer: "",
    destination: "",
    product: "",
    quantity: "",
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
      const res = await fetch("http://127.0.0.1:8000/api/v1/shipments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSuccess(true);
      setForm({ customer: "", destination: "", product: "", quantity: "" });
    } catch (err) {
      setError("Could not create shipment. Check the details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <PageHeader icon="fe-truck" title="Create a new shipment" />

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
              Shipment created.
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

          <FormField label="Customer" htmlFor="id_customer">
            <select
              name="customer"
              required
              value={form.customer}
              onChange={handleChange}
              style={inputStyle}
              id="id_customer"
            >
              <option value="">---------</option>
              {customers.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Destination of shipment" htmlFor="id_destination">
            <input
              type="text"
              name="destination"
              maxLength={100}
              required
              value={form.destination}
              onChange={handleChange}
              style={inputStyle}
              id="id_destination"
            />
          </FormField>

          <FormField label="Product" htmlFor="id_product">
            <select
              name="product"
              required
              value={form.product}
              onChange={handleChange}
              style={inputStyle}
              id="id_product"
            >
              <option value="">---------</option>
              {products.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Product quantity" htmlFor="id_quantity">
            <input
              type="number"
              name="quantity"
              min="0"
              required
              value={form.quantity}
              onChange={handleChange}
              style={inputStyle}
              id="id_quantity"
            />
          </FormField>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Create shipment"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateShipmentPage;
