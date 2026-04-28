import React from "react";

export default function Dashboard({ stats }) {
  const cards = [
    { key: "total",          label: "Total Leads",     cls: "total",      value: stats.total },
    { key: "interested",     label: "Interested",      cls: "interested", value: stats.interested },
    { key: "converted",      label: "Converted",       cls: "converted",  value: stats.converted },
    { key: "not_interested", label: "Not Interested",  cls: "not-int",    value: stats.not_interested },
  ];

  return (
    <div className="stats-grid">
      {cards.map((c) => (
        <div key={c.key} className={`stat-card ${c.cls}`}>
          <div className="stat-label">{c.label}</div>
          <div className="stat-value">{c.value ?? 0}</div>
        </div>
      ))}
    </div>
  );
}
