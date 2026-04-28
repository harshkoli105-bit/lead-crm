import React from "react";
import Dashboard from "./components/Dashboard";
import LeadsCharts from "./components/LeadsCharts";
import AddLeadForm from "./components/AddLeadForm";
import LeadsTable from "./components/LeadsTable";
import { useLeads } from "./hooks/useLeads";
import "./styles/global.css";

export default function App() {
  const {
    leads, stats, loading, error,
    search, setSearch,
    statusFilter, setStatusFilter,
    addLead, updateStatus, deleteLead,
  } = useLeads();

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <div className="header-dot" />
          <div>
            <h1>LeadCRM</h1>
          </div>
        </div>
        <span className="header-sub">LEAD MANAGEMENT SYSTEM</span>
      </header>

      {/* Dashboard */}
      <Dashboard stats={stats} />

      {/* Charts */}
      <LeadsCharts leads={leads} />

      {/* Global API error */}
      {error && <div className="alert alert-error" style={{ marginBottom: 24 }}>⚠ {error}</div>}

      {/* Main content */}
      <div className="main-grid">
        <AddLeadForm onAdd={addLead} />
        <LeadsTable
          leads={leads}
          loading={loading}
          onUpdateStatus={updateStatus}
          onDelete={deleteLead}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>
    </div>
  );
}
