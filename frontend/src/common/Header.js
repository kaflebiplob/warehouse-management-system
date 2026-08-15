import React, { useState } from "react";
import { Link } from "react-router-dom";
import { colors, fontMono } from "../theme";

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
};

const Header = () => {
  const [hoverAvatar, setHoverAvatar] = useState(false);

  return (
    <nav style={styles.nav} id="topnav">
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>
          <span style={styles.brandDot} />
          Stock
        </Link>

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
    </nav>
  );
};

export default Header;
