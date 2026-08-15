import React from "react";
import { colors, fontMono } from "../theme";

const styles = {
  wrap: {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    fontFamily: fontMono,
    fontSize: "0.7rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: colors.textLo,
    padding: "0.85rem 1rem",
    borderBottom: `1px solid ${colors.border}`,
  },
  td: {
    padding: "0.85rem 1rem",
    fontSize: "0.9rem",
    color: colors.textHi,
    borderBottom: `1px solid ${colors.border}`,
  },
  emptyRow: {
    padding: "2rem 1rem",
    textAlign: "center",
    color: colors.textLo,
    fontSize: "0.85rem",
  },
};

const Table = ({ data = [], list = [] }) => {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1.5rem" }}>
      <div style={styles.wrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {data.map((heading) => (
                <th style={styles.th} key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td style={styles.emptyRow} colSpan={data.length || 1}>
                  Nothing here yet.
                </td>
              </tr>
            ) : (
              list.map((row, i) => {
                const key = row.id ?? row.sku ?? row.email ?? i;
                return (
                  <tr
                    key={key}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = colors.surfaceRaised)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={styles.td}>
                      {row.firstname || row.name || row.destination}
                    </td>
                    <td style={styles.td}>{row.lastname || row.quantity}</td>
                    <td style={styles.td}>
                      {row.email || row.sku || row.product}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
