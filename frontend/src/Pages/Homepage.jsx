import React, { useState, useEffect } from "react";
import "../fonts/feather/feather.min.css";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";

// Design tokens
const colors = {
  bg: "#12151a",
  surface: "#1a1e25",
  surfaceRaised: "#20252d",
  border: "#2c323c",
  textHi: "#f5f6f8",
  textLo: "#9198a6",
  accent: "#f5a623",
  accentDim: "#f5a62322",
  teal: "#35c4a1",
};

const fontDisplay = "'Segoe UI', system-ui, -apple-system, sans-serif";
const fontBody = "'Segoe UI', system-ui, -apple-system, sans-serif";
const fontMono = "'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace";

const panels = [
  {
    title: "Shipments",
    icon: "fe-truck",
    bin: "BIN-01",
    addTo: "/shipments/new",
    listTo: "/shipments",
  },
  {
    title: "Products",
    icon: "fe-tag",
    bin: "BIN-02",
    addTo: "/products/new",
    listTo: "/products",
  },
  {
    title: "Customers",
    icon: "fe-user",
    bin: "BIN-03",
    addTo: "/customers/new",
    listTo: "/customers",
  },
];

const styles = {
  dashboard: {
    background: colors.bg,
    minHeight: "100vh",
    padding: "2.5rem 1.5rem 4rem",
    fontFamily: fontBody,
    color: colors.textHi,
  },
  shell: {
    maxWidth: 960,
    margin: "0 auto",
  },
  topline: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "2.5rem",
    borderBottom: `1px solid ${colors.border}`,
    paddingBottom: "1.5rem",
  },
  eyebrow: {
    fontFamily: fontMono,
    fontSize: "0.75rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.accent,
    margin: "0 0 0.4rem",
  },
  greeting: {
    fontFamily: fontDisplay,
    fontWeight: 600,
    fontSize: "1.9rem",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  manifestTag: {
    fontFamily: fontMono,
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.textLo,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: colors.teal,
    boxShadow: "0 0 0 3px #35c4a11f",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  statCard: {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderLeft: `3px solid ${colors.accent}`,
    borderRadius: 6,
    padding: "1.1rem 1.25rem",
  },
  statTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.6rem",
  },
  statLabel: {
    fontSize: "0.72rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: colors.textLo,
  },
  statCode: {
    fontFamily: fontMono,
    fontSize: "0.68rem",
    color: colors.border,
  },
  statValue: {
    fontFamily: fontMono,
    fontWeight: 600,
    fontSize: "1.65rem",
    color: colors.textHi,
    display: "block",
  },
  panels: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1rem",
  },
  panel: {
    position: "relative",
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: "1.5rem 1.25rem 1.25rem",
    transition: "border-color 0.15s ease, transform 0.15s ease",
  },
  panelTab: {
    position: "absolute",
    top: "-0.55rem",
    left: "1.1rem",
    background: colors.bg,
    border: `1px solid ${colors.border}`,
    color: colors.textLo,
    fontFamily: fontMono,
    fontSize: "0.65rem",
    letterSpacing: "0.06em",
    padding: "0.15rem 0.5rem",
    borderRadius: 4,
  },
  panelHead: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    margin: "0.5rem 0 1.25rem",
  },
  panelIcon: {
    fontSize: "1.1rem",
    color: colors.accent,
  },
  panelTitle: {
    fontFamily: fontDisplay,
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: 0,
  },
  panelActions: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  action: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.88rem",
    fontWeight: 500,
    color: colors.textHi,
    background: colors.surfaceRaised,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: "0.6rem 0.75rem",
    textDecoration: "none",
  },
  actionSecondary: {
    color: colors.textLo,
  },
};

const Homepage = () => {
  const [counts, setCounts] = useState({
    orders: null,
    products: null,
    customers: null,
  });
  const [loadError, setLoadError] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchCounts = async () => {
      try {
        const [productsRes, customersRes, shipmentsRes] = await Promise.all([
          axiosInstance.get("/api/v1/products/all"),
          axiosInstance.get("/api/v1/customers/all"),
          axiosInstance.get("/api/v1/shipments/all"),
        ]);

        if (!isMounted) return;

        // Handles both plain arrays and DRF-paginated {count, results} responses
        const extractCount = (data) => {
          if (Array.isArray(data)) return data.length;
          if (data && typeof data.count === "number") return data.count;
          if (data && Array.isArray(data.results)) return data.results.length;
          return 0;
        };

        setCounts({
          products: extractCount(productsRes.data),
          customers: extractCount(customersRes.data),
          orders: extractCount(shipmentsRes.data),
        });
      } catch (err) {
        console.error("[Homepage] failed to load stats:", err);
        if (isMounted) {
          setLoadError("Couldn't load live stats. Showing unavailable.");
        }
      }
    };

    fetchCounts();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    {
      label: "Total Shipments",
      value: counts.orders === null ? "…" : counts.orders,
      code: "LOG-01",
    },
    {
      label: "Total Products",
      value: counts.products === null ? "…" : counts.products,
      code: "LOG-02",
    },
    {
      label: "Customers",
      value: counts.customers === null ? "…" : counts.customers,
      code: "LOG-03",
    },
  ];

  return (
    <>
      <Header />
      <div style={styles.dashboard}>
        <div style={styles.shell}>
          {/* Header */}
          <div style={styles.topline}>
            <div>
              <p style={styles.eyebrow}>Warehouse Name</p>
              <h1 style={styles.greeting}>Welcome back, AWS Warehouse</h1>
            </div>
            <div style={styles.manifestTag}>
              <span style={styles.dot} />
              MANIFEST · {today}
            </div>
          </div>

          {loadError && (
            <div
              style={{
                background: "#e5484d1a",
                border: "1px solid #e5484d44",
                color: "#e5484d",
                borderRadius: 6,
                padding: "0.6rem 0.75rem",
                fontSize: "0.82rem",
                marginBottom: "1.5rem",
              }}
            >
              {loadError}
            </div>
          )}

          {/* Stat strip */}
          <div style={styles.stats}>
            {stats.map((s) => (
              <div style={styles.statCard} key={s.code}>
                <div style={styles.statTop}>
                  <span style={styles.statLabel}>{s.label}</span>
                  <span style={styles.statCode}>{s.code}</span>
                </div>
                <span style={styles.statValue}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Action panels */}
          <div style={styles.panels}>
            {panels.map((p) => (
              <div
                style={styles.panel}
                key={p.bin}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.panelTab}>{p.bin}</div>

                <div style={styles.panelHead}>
                  <i
                    className={`fe ${p.icon}`}
                    style={styles.panelIcon}
                    aria-hidden="true"
                  />
                  <h2 style={styles.panelTitle}>{p.title}</h2>
                </div>

                <div style={styles.panelActions}>
                  <Link
                    to={p.addTo}
                    style={styles.action}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.accent;
                      e.currentTarget.style.background = colors.accentDim;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.background = colors.surfaceRaised;
                    }}
                  >
                    <i className="fe fe-plus-circle" aria-hidden="true" />
                    Add new
                  </Link>
                  <Link
                    to={p.listTo}
                    style={{ ...styles.action, ...styles.actionSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.accent;
                      e.currentTarget.style.background = colors.accentDim;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.background = colors.surfaceRaised;
                    }}
                  >
                    <i className="fe fe-list" aria-hidden="true" />
                    View all {p.title.toLowerCase()}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;