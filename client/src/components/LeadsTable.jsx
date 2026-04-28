import React, { useState } from "react";

const STATUSES = ["Interested", "Not Interested", "Converted"];

const sourceClass = (s) =>
  ({ Call: "badge-call", WhatsApp: "badge-whatsapp", Field: "badge-field" }[s] || "badge-call");

const statusClass = (s) =>
  ({ Interested: "interested", Converted: "converted", "Not Interested": "not-interested" }[s] || "");

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "2-digit",
  });
}

export default function LeadsTable({ leads, loading, onUpdateStatus, onDelete, search, setSearch, statusFilter, setStatusFilter }) {
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try { await onUpdateStatus(id, status); }
    catch (err) { alert(err.response?.data?.message || "Update failed"); }
    finally { setUpdatingId(null); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete lead "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try { await onDelete(id); }
    catch (err) { alert("Delete failed. Try again."); }
    finally { setDeletingId(null); }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Leads — {leads.length} shown</span>
      </div>

      {/* Toolbar */}
      <div className="panel-body" style={{ paddingBottom: 0 }}>
        <div className="toolbar">
          <input
            type="text"
            className="form-input"
            placeholder="Search by name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className="hide-mobile">Phone</th>
              <th className="hide-mobile">Source</th>
              <th>Status</th>
              <th className="hide-mobile">Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="loading-row">
                <td colSpan={7}><span className="spinner" style={{ marginRight: 8 }} />Loading leads…</td>
              </tr>
            )}

            {!loading && leads.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <p>No leads found. Add your first lead!</p>
                  </div>
                </td>
              </tr>
            )}

            {!loading && leads.map((lead, i) => (
              <tr key={lead.id}>
                <td style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "DM Mono, monospace" }}>{i + 1}</td>
                <td>
                  <div className="lead-name">{lead.name}</div>
                  <div className="lead-phone" style={{ display: "none" }}>{lead.phone}</div>
                  {/* show phone inline on mobile */}
                  <div className="lead-phone" style={{ marginTop: 2 }}
                    data-mobile-only={true}>{lead.phone}</div>
                </td>
                <td className="hide-mobile">
                  <span className="lead-phone">{lead.phone}</span>
                </td>
                <td className="hide-mobile">
                  <span className={`badge ${sourceClass(lead.source)}`}>{lead.source}</span>
                </td>
                <td>
                  <select
                    className={`status-select ${statusClass(lead.status)}`}
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    disabled={updatingId === lead.id}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="hide-mobile">
                  <span className="lead-date">{formatDate(lead.created_at)}</span>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(lead.id, lead.name)}
                    disabled={deletingId === lead.id}
                    title="Delete lead"
                  >
                    {deletingId === lead.id ? <span className="spinner" /> : "✕"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
