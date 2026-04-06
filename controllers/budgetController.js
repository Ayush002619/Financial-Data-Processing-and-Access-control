const Budget = require("../models/budget");
const Record = require("../models/Record");
const mongoose = require("mongoose");

//UPDATE BUDGET
exports.setBudget = async (req, res) => {
    try {
        const { category, limit } = req.body;

        const budget = await Budget.findOneAndUpdate(
            { user: req.user.userId, category },
            { limit },
            { upsert: true, new: true }
        );

        res.json({ message: "Budget set", budget });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBudgetStatus = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const budgets = await Budget.find({ user: userId });

        const result = [];

        for (let b of budgets) {
            const totalSpent = await Record.aggregate([
                {
                    $match: {
                        user: userId,
                        category: b.category,
                        type: "expense"
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$amount" }
                    }
                }
            ]);

            const spent = totalSpent[0]?.total || 0;

            result.push({
                category: b.category,
                limit: b.limit,
                spent,
                remaining: b.limit - spent,
                status: spent > b.limit ? "Exceeded" : "Within limit"
            });
        }

        res.json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};