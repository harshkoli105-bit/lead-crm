const LeadModel = require("../models/Lead");

const VALID_SOURCES = ["Call", "WhatsApp", "Field"];
const VALID_STATUSES = ["Interested", "Not Interested", "Converted"];

const LeadController = {
  // GET /leads
  async getAll(req, res) {
    try {
      const { search = "", status = "" } = req.query;
      const leads = await LeadModel.getAll({ search, status });
      res.json({ success: true, data: leads, count: leads.length });
    } catch (error) {
      console.error("getAll error:", error.message);
      res.status(500).json({ success: false, message: "Failed to fetch leads" });
    }
  },

  // POST /leads
  async create(req, res) {
    try {
      const { name, phone, source } = req.body;

      // Validate required fields
      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: "Name is required" });
      }

      if (!phone || !phone.trim()) {
        return res.status(400).json({ success: false, message: "Phone is required" });
      }

      // Validate phone: exactly 10 digits
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.trim())) {
        return res.status(400).json({
          success: false,
          message: "Phone must be exactly 10 digits",
        });
      }

      if (!source || !VALID_SOURCES.includes(source)) {
        return res.status(400).json({
          success: false,
          message: `Source must be one of: ${VALID_SOURCES.join(", ")}`,
        });
      }

      const lead = await LeadModel.create({ name, phone, source });
      res.status(201).json({ success: true, data: lead, message: "Lead created successfully" });
    } catch (error) {
      console.error("create error:", error.message);
      res.status(500).json({ success: false, message: "Failed to create lead" });
    }
  },

  // PUT /leads/:id
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || !VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
        });
      }

      const lead = await LeadModel.updateStatus(id, status);

      if (!lead) {
        return res.status(404).json({ success: false, message: "Lead not found" });
      }

      res.json({ success: true, data: lead, message: "Status updated successfully" });
    } catch (error) {
      console.error("updateStatus error:", error.message);
      res.status(500).json({ success: false, message: "Failed to update lead" });
    }
  },

  // DELETE /leads/:id
  async delete(req, res) {
    try {
      const { id } = req.params;
      const lead = await LeadModel.delete(id);

      if (!lead) {
        return res.status(404).json({ success: false, message: "Lead not found" });
      }

      res.json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
      console.error("delete error:", error.message);
      res.status(500).json({ success: false, message: "Failed to delete lead" });
    }
  },

  // GET /leads/stats
  async getStats(req, res) {
    try {
      const stats = await LeadModel.getStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      console.error("getStats error:", error.message);
      res.status(500).json({ success: false, message: "Failed to fetch stats" });
    }
  },
};

module.exports = LeadController;
