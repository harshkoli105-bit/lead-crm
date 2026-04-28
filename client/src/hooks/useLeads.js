import { useState, useEffect, useCallback } from "react";
import { leadsApi } from "../utils/api";

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, interested: 0, not_interested: 0, converted: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await leadsApi.getAll({ search, status: statusFilter });
      setLeads(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await leadsApi.getStats();
      setStats(res.data.data);
    } catch (err) {
      console.error("Stats fetch error:", err.message);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [fetchLeads, fetchStats]);

  const addLead = async (formData) => {
    const res = await leadsApi.create(formData);
    setLeads((prev) => [res.data.data, ...prev]);
    await fetchStats();
    return res.data;
  };

  const updateStatus = async (id, status) => {
    const res = await leadsApi.updateStatus(id, status);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? res.data.data : l))
    );
    await fetchStats();
    return res.data;
  };

  const deleteLead = async (id) => {
    await leadsApi.delete(id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetchStats();
  };

  return {
    leads, stats, loading, error,
    search, setSearch,
    statusFilter, setStatusFilter,
    addLead, updateStatus, deleteLead,
    refresh: fetchLeads,
  };
}
