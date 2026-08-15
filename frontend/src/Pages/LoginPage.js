import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { colors, fontDisplay, fontMono } from "../theme";

const styles = {
  page: {
    minHeight: "100vh",
    background: colors.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1.25rem",
    fontFamily: fontDisplay,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    padding: "2rem 1.75rem",
  },
  eyebrow: {
    fontFamily: fontMono,
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: colors.accent,
    margin: "0 0 0.5rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: colors.textHi,
    margin: "0 0 1.75rem",
  },
  label: {
    display: "block",
    fontSize: "0.78rem",
    color: colors.textLo,
    marginBottom: "0.4rem",
  },
  field: { marginBottom: "1.1rem" },
  inputWrap: { position: "relative" },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: colors.surfaceRaised,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    color: colors.textHi,
    padding: "0.65rem 0.8rem",
    fontSize: "0.92rem",
    outline: "none",
  },
  eyeBtn: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: colors.textLo,
    cursor: "pointer",
    padding: 4,
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.4rem",
  },
  forgot: {
    fontSize: "0.78rem",
    color: colors.textLo,
    textDecoration: "none",
  },
  error: {
    background: "#e5484d1a",
    border: `1px solid ${colors.danger}44`,
    color: colors.danger,
    borderRadius: 6,
    padding: "0.6rem 0.75rem",
    fontSize: "0.82rem",
    marginBottom: "1.1rem",
  },
  submit: {
    width: "100%",
    background: colors.accent,
    color: "#1a1206",
    border: "none",
    borderRadius: 6,
    padding: "0.75rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "0.25rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.25rem",
    fontSize: "0.82rem",
    color: colors.textLo,
  },
  link: { color: colors.accent, textDecoration: "none" },
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log("[LoginPage] token already exists, skipping login page");
      navigate("/", { replace: true });
    }
  }, [navigate]);
  useEffect(() => {
    if (isLoggedIn) {
      console.log("[LoginPage] isLoggedIn is true, navigating to /");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    console.log("[LoginPage] handleSubmit fired");
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      console.log("[LoginPage] sending request to /api/token with:", {
        email,
        password: "(hidden)",
      });

      const response = await axiosInstance.post("/api/token", {
        email,
        password,
      });

      console.log(
        "[LoginPage] request succeeded, response.data:",
        response.data,
      );

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      if (!accessToken || !refreshToken) {
        console.error(
          "[LoginPage] response was 200 but missing access/refresh fields:",
          response.data,
        );
        setError(
          "Server responded but did not return tokens. Check the response shape.",
        );
        setSubmitting(false);
        return;
      }

      axiosInstance.defaults.headers["Authorization"] = `JWT ${accessToken}`;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      console.log(
        "[LoginPage] wrote to localStorage. access_token now:",
        localStorage.getItem("access_token"),
      );

      setIsLoggedIn(true);
    } catch (err) {
      if (err.response) {
        // Server responded, but with an error status (400/401/500 etc)
        console.error(
          "[LoginPage] server responded with error:",
          err.response.status,
          err.response.data,
        );
        setError(
          err.response.data?.detail ||
            err.response.data?.non_field_errors?.[0] ||
            `Server error (${err.response.status}). Check console for details.`,
        );
      } else if (err.request) {
        // Request was sent but no response came back at all (server down, CORS block, wrong URL)
        console.error(
          "[LoginPage] no response received. Possible CORS, network, or server-down issue:",
          err.request,
        );
        setError("No response from server. Is Django running? Check console.");
      } else {
        // Something broke before the request was even sent
        console.error("[LoginPage] request setup error:", err.message);
        setError(
          "Something went wrong before the request was sent. Check console.",
        );
      }
      setIsLoggedIn(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.eyebrow}>Warehouse Access</p>
        <h1 style={styles.title}>Sign in</h1>

        <form onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.field}>
            <label style={styles.label} htmlFor="id_login">
              E-mail
            </label>
            <input
              type="email"
              name="login"
              placeholder="you@company.com"
              style={styles.input}
              required
              value={email}
              id="id_login"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.field}>
            <div style={styles.rowBetween}>
              <label style={styles.label} htmlFor="id_password">
                Password
              </label>
              <a href={`${process.env.REACT_APP_API_BASE_URL}/accounts/password/reset/`} style={styles.forgot}>
                Forgot password?
              </a>
            </div>
            <div style={styles.inputWrap}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                style={{ ...styles.input, paddingRight: "2.4rem" }}
                required
                value={password}
                id="id_password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fe ${showPassword ? "fe-eye-off" : "fe-eye"}`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{ ...styles.submit, opacity: submitting ? 0.7 : 1 }}
            disabled={submitting}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>

          <div style={styles.footer}>
            Don't have an account?{" "}
            <a
              href={`${process.env.REACT_APP_API_BASE_URL}/accounts/signup/?next=%2F`}
              style={styles.link}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
