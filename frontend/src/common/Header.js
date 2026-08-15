import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { colors, fontMono } from "../theme";
import axiosInstance from "../axiosInstance";

const styles = {
  nav: {
    background: colors.bg,
    borderBottom: `1px solid ${colors.border}`,
    padding: "0.9rem 1.5rem",
  },
  inner: {
    maxWidth: 960,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    fontFamily: fontMono,
    fontSize: "0.95rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.textHi,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  brandDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: colors.accent,
  },
  toggle: {
    display: "none",
    background: "transparent",
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    color: colors.textHi,
    padding: "0.4rem 0.6rem",
    cursor: "pointer",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.accent,
    textDecoration: "none",
    transition: "border-color 0.15s ease",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "transparent",
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    color: colors.textLo,
    fontSize: "0.82rem",
    fontFamily: fontMono,
    padding: "0.45rem 0.75rem",
    cursor: "pointer",
    transition: "border-color 0.15s ease, color 0.15s ease",
  },
};

const Header = () => {
  const [hoverAvatar, setHoverAvatar] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    console.log("[Header] logging out");

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    delete axiosInstance.defaults.headers["Authorization"];

    navigate("/login", { replace: true });
  };

  return (
    <nav style={styles.nav} id="topnav">
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>
          <span style={styles.brandDot} />
          Stock
        </Link>

        <div style={styles.right}>
          {isLoggedIn && (
            <button
              type="button"
              style={{
                ...styles.logoutBtn,
                borderColor: hoverLogout ? colors.accent : colors.border,
                color: hoverLogout ? colors.textHi : colors.textLo,
              }}
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              onClick={handleLogout}
              aria-label="Log out"
            >
              <i className="fe fe-log-out" aria-hidden="true" />
              Log out
            </button>
          )}

          <Link
            to="/login"
            style={{
              ...styles.avatar,
              borderColor: hoverAvatar ? colors.accent : colors.border,
            }}
            onMouseEnter={() => setHoverAvatar(true)}
            onMouseLeave={() => setHoverAvatar(false)}
            aria-label="Account"
          >
            <i className="fe fe-user" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
