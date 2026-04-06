const express = require("express");
const {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
} = require("../controllers/recordController");

const { verifyToken } = require("../middleware/authMiddleware");
const { getSummary, getCategoryWise, getRecentActivity, getMonthlyTrends, getInsights, exportCSV } = require("../controllers/recordController");



const router = express.Router();

router.post("/", verifyToken, createRecord);
router.get("/", verifyToken, getRecords);
router.put("/:id", verifyToken, updateRecord);
router.delete("/:id", verifyToken, deleteRecord);
router.get("/summary", verifyToken, getSummary);
router.get("/category", verifyToken, getCategoryWise);
router.get("/recent", verifyToken, getRecentActivity);
router.get("/trends", verifyToken, getMonthlyTrends);
router.get("/insights", verifyToken, getInsights);
router.get("/export", verifyToken, exportCSV);

module.exports = router;