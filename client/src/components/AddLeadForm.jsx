import React, { useState } from "react";

const SOURCES = ["Call", "WhatsApp", "Field"];

const initialForm = { name: "", phone: "", source: "" };

export default function AddLeadForm({ onAdd }) {
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim())            e.name   = "Name is required";
    if (!form.phone.trim())           e.phone  = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone.trim()))
                                      e.phone  = "Phone must be exactly 10 digits";
    if (!form.source)                 e.source = "Please select a source";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess(""); setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true); setApiError("");
    try {
      await onAdd({ name: form.name.trim(), phone: form.phone.trim(), source: form.source });
      setSuccess("Lead added successfully!");
      setForm(initialForm);
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to add lead. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Add New Lead</span>
      </div>
      <div className="panel-body">
        {apiError && <div className="alert alert-error">⚠ {apiError}</div>}
        {success  && <div className="alert alert-success">✓ {success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name <span>*</span></label>
            <input
              id="name" name="name" type="text"
              className="form-input"
              placeholder="e.g. Ravi Kumar"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone <span>*</span></label>
            <input
              id="phone" name="phone" type="tel"
              className="form-input"
              placeholder="10-digit number"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              autoComplete="off"
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="source">Source <span>*</span></label>
            <select
              id="source" name="source"
              className="form-select"
              value={form.source}
              onChange={handleChange}
            >
              <option value="">— Select source —</option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.source && <p className="form-error">{errors.source}</p>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <><span className="spinner" /> Adding…</> : "+ Add Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}
