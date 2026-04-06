const express = require("express");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Only admin can access
router.get("/admin", verifyToken, allowRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

// Analyst + Admin
router.get("/analytics", verifyToken, allowRoles("admin", "analyst"), (req, res) => {
    res.json({ message: "Analytics data" });
});

// All logged-in users
router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "User profile", user: req.user });
});

module.exports = router;