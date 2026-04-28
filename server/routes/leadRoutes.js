const express = require("express");
const router = express.Router();
const LeadController = require("../controllers/leadController");

// GET /leads/stats  ← must be BEFORE /:id routes
router.get("/stats", LeadController.getStats);

// GET /leads
router.get("/", LeadController.getAll);

// POST /leads
router.post("/", LeadController.create);

// PUT /leads/:id
router.put("/:id", LeadController.updateStatus);

// DELETE /leads/:id
router.delete("/:id", LeadController.delete);

module.exports = router;
