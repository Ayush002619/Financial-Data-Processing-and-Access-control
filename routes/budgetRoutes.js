const express = require("express");
const router = express.Router();

const { setBudget, getBudgetStatus } = require("../controllers/budgetController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, setBudget);
router.get("/", verifyToken, getBudgetStatus);

module.exports = router;