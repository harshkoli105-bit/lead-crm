import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ─── Color palette (matches global.css CSS vars) ──────────────────────────────
const STATUS_COLORS = {
  Interested:       "#60a5fa", // --blue
  Converted:        "#4ade80", // --green
  "Not Interested": "#f87171", // --red
};

const SOURCE_COLORS = {
  Call:      "#e8ff47", // --accent / yellow
  WhatsApp:  "#4ade80", // --green
  Field:     "#fb923c", // --orange
};

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: entry } = payload[0];
  return (
    <div style={{
      background: "#222228",
      border: "1px solid #3a3a44",
      borderRadius: 8,
      padding: "10px 14px",
      fontFamily: "'Syne', sans-serif",
      fontSize: "0.82rem",
      color: "#f0f0f4",
      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{
          display: "inline-block",
          width: 10, height: 10,
          borderRadius: "50%",
          background: entry.fill,
          flexShrink: 0,
        }} />
        <span style={{ fontWeight: 600 }}>{name}</span>
      </div>
      <div style={{ color: "#888892", fontSize: "0.75rem", fontFamily: "DM Mono, monospace" }}>
        {value} lead{value !== 1 ? "s" : ""} &nbsp;·&nbsp; {entry.percent}%
      </div>
    </div>
  );
}

// ─── Custom legend ────────────────────────────────────────────────────────────
function CustomLegend({ payload }) {
  if (!payload?.length) return null;
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "8px 16px",
      marginTop: 12,
    }}>
      {payload.map((entry) => (
        <div key={entry.value} style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: "0.75rem",
          fontFamily: "'Syne', sans-serif",
          color: "#888892",
        }}>
          <span style={{
            display: "inline-block",
            width: 8, height: 8,
            borderRadius: "50%",
            background: entry.color,
            flexShrink: 0,
          }} />
          {entry.value}
        </div>
      ))}
    </div>
  );
}

// ─── Custom center label rendered as SVG ──────────────────────────────────────
function CenterLabel({ cx, cy, total, label }) {
  return (
    <g>
      <text
        x={cx} y={cy - 8}
        textAnchor="middle"
        fill="#f0f0f4"
        fontSize={28}
        fontWeight={800}
        fontFamily="'Syne', sans-serif"
      >
        {total}
      </text>
      <text
        x={cx} y={cy + 14}
        textAnchor="middle"
        fill="#888892"
        fontSize={11}
        fontFamily="'DM Mono', monospace"
        letterSpacing={1.5}
        textTransform="uppercase"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

// ─── Single donut chart card ──────────────────────────────────────────────────
function DonutCard({ title, data, colors, emptyMessage }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const isEmpty = total === 0;

  // Attach percent string to each entry for the tooltip
  const dataWithPercent = data.map((d) => ({
    ...d,
    percent: total > 0 ? Math.round((d.value / total) * 100) : 0,
  }));

  return (
    <div style={{
      background: "#18181c",
      border: "1px solid #2e2e36",
      borderRadius: 14,
      padding: "20px 20px 16px",
      flex: "1 1 300px",
      minWidth: 0,
    }}>
      {/* Card header */}
      <div style={{
        fontSize: "0.7rem",
        fontFamily: "'DM Mono', monospace",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#888892",
        marginBottom: 16,
      }}>
        {title}
      </div>

      {isEmpty ? (
        <div style={{
          height: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#888892",
          fontSize: "0.85rem",
          gap: 8,
        }}>
          <span style={{ fontSize: "2rem", opacity: 0.3 }}>◎</span>
          <span>{emptyMessage}</span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={dataWithPercent}
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {dataWithPercent.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={colors[entry.name]}
                  opacity={entry.value === 0 ? 0.2 : 1}
                />
              ))}
              {/* Center label rendered as custom label prop */}
              <CenterLabel cx={0} cy={0} total={total} label="total" />
            </Pie>

            {/* Re-render center label properly via labelLine=false trick */}
            <Pie
              data={[{ value: 1 }]}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={0}
              dataKey="value"
              label={({ cx, cy }) => (
                <CenterLabel cx={cx} cy={cy} total={total} label="total" />
              )}
              labelLine={false}
              isAnimationActive={false}
            >
              <Cell fill="transparent" />
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      )}

      {/* Mini stats row */}
      {!isEmpty && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginTop: 12,
          paddingTop: 12,
          borderTop: "1px solid #2e2e36",
        }}>
          {data.map((d) => (
            <div key={d.name} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: colors[d.name],
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}>
                {d.value}
              </div>
              <div style={{
                fontSize: "0.65rem",
                fontFamily: "'DM Mono', monospace",
                color: "#888892",
                marginTop: 3,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}>
                {d.name === "Not Interested" ? "Not Int." : d.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export default function LeadsCharts({ leads = [] }) {
  // Compute status distribution
  const statusData = useMemo(() => {
    const counts = { Interested: 0, Converted: 0, "Not Interested": 0 };
    leads.forEach((l) => {
      if (l.status in counts) counts[l.status]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [leads]);

  // Compute source distribution
  const sourceData = useMemo(() => {
    const counts = { Call: 0, WhatsApp: 0, Field: 0 };
    leads.forEach((l) => {
      if (l.source in counts) counts[l.source]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [leads]);

  return (
    <div style={{
      display: "flex",
      gap: 16,
      marginBottom: 28,
      flexWrap: "wrap",
    }}>
      <DonutCard
        title="Lead Status Breakdown"
        data={statusData}
        colors={STATUS_COLORS}
        emptyMessage="No leads yet"
      />
      <DonutCard
        title="Lead Source Breakdown"
        data={sourceData}
        colors={SOURCE_COLORS}
        emptyMessage="No leads yet"
      />
    </div>
  );
}
