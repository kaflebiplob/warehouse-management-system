import React, { useState } from "react";
import Header from "../common/Header";
import PageHeader from "../common/PageHeader";
import FormField, { inputStyle } from "../common/FormField";
import Button from "../common/Button";
import { colors } from "../theme";
import PageWrapper from "../common/PageWrapper";

const CreateCustomerPage = () => {
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "" });
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
      const res = await fetch("http://127.0.0.1:8000/api/v1/customers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSuccess(true);
      setForm({ firstname: "", lastname: "", email: "" });
    } catch (err) {
      setError("Could not create customer. Check the details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <PageHeader icon="fe-user" title="Add a customer" />

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
                Customer created.
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

            <FormField label="First name" htmlFor="id_firstname">
              <input
                type="text"
                name="firstname"
                maxLength={50}
                required
                value={form.firstname}
                onChange={handleChange}
                style={inputStyle}
                id="id_firstname"
              />
            </FormField>

            <FormField label="Last name" htmlFor="id_lastname">
              <input
                type="text"
                name="lastname"
                maxLength={50}
                required
                value={form.lastname}
                onChange={handleChange}
                style={inputStyle}
                id="id_lastname"
              />
            </FormField>

            <FormField label="Email address" htmlFor="id_email">
              <input
                type="email"
                name="email"
                maxLength={100}
                required
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
                id="id_email"
              />
            </FormField>

            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating…" : "Create customer"}
            </Button>
          </form>
        </div>
      </PageWrapper>
    </>
  );
};

export default CreateCustomerPage;
