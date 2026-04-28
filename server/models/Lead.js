const pool = require("../config/db");

const LeadModel = {
  // Get all leads with optional search and filter
  async getAll({ search = "", status = "" } = {}) {
    let query = "SELECT * FROM leads WHERE 1=1";
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR phone ILIKE $${params.length})`;
    }

    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    return result.rows;
  },

  // Get single lead by ID
  async getById(id) {
    const result = await pool.query("SELECT * FROM leads WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  // Create new lead
  async create({ name, phone, source }) {
    const result = await pool.query(
      `INSERT INTO leads (name, phone, source) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [name.trim(), phone.trim(), source]
    );
    return result.rows[0];
  },

  // Update lead status
  async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE leads SET status = $1 
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    );
    return result.rows[0] || null;
  },

  // Delete lead
  async delete(id) {
    const result = await pool.query(
      "DELETE FROM leads WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0] || null;
  },

  // Get dashboard stats
  async getStats() {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'Interested') AS interested,
        COUNT(*) FILTER (WHERE status = 'Not Interested') AS not_interested,
        COUNT(*) FILTER (WHERE status = 'Converted') AS converted
      FROM leads
    `);
    return result.rows[0];
  },
};

module.exports = LeadModel;
