const Record = require("../models/Record");
const { Parser } = require("json2csv");
const mongoose = require("mongoose");

// CREATE RECORD
exports.createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, note } = req.body;

        const record = await Record.create({
            amount,
            type,
            category,
            date,
            note,
            user: req.user.userId
        });

        res.status(201).json({ message: "Record created", record });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET RECORDS (pagination + filters + search)
exports.getRecords = async (req, res) => {
    try {
        const {
            type,
            category,
            startDate,
            endDate,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        let filter = { user: req.user.userId };

        if (type) {
            filter.type = type;
        }

        if (category) {
            filter.category = category;
        }

        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        //SEARCH FEATURE
        if (search) {
            filter.$or = [
                { category: { $regex: search, $options: "i" } },
                { note: { $regex: search, $options: "i" } }
            ];
        }

        const skip = (pageNum - 1) * limitNum;

        const records = await Record.find(filter)
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 });

        const total = await Record.countDocuments(filter);

        res.json({
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            records
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE RECORD
exports.updateRecord = async (req, res) => {
    try {
        const { id } = req.params;

        const record = await Record.findOneAndUpdate(
            { _id: id, user: req.user.userId },
            req.body,
            { new: true }
        );

        res.json({ message: "Record updated", record });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE RECORD
exports.deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;

        await Record.findOneAndDelete({
            _id: id,
            user: req.user.userId
        });

        res.json({ message: "Record deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//getsummery
exports.getSummary = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const result = await Record.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                        }
                    }
                }
            }
        ]);

        const data = result[0] || { totalIncome: 0, totalExpense: 0 };

        res.json({
            totalIncome: data.totalIncome,
            totalExpense: data.totalExpense,
            netBalance: data.totalIncome - data.totalExpense
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//getcategorywise
exports.getCategoryWise = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const data = await Record.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//getRecentActivity
exports.getRecentActivity = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const records = await Record.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json(records);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//getMonthlyTrends
exports.getMonthlyTrends = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const data = await Record.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    income: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                        }
                    },
                    expense: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                        }
                    }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//getInsights
exports.getInsights = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const records = await Record.find({ user: userId });

        let income = 0;
        let expense = 0;

        const categoryMap = {};

        records.forEach(r => {
            if (r.type === "income") {
                income += r.amount;
            } else {
                expense += r.amount;

                // category tracking
                categoryMap[r.category] =
                    (categoryMap[r.category] || 0) + r.amount;
            }
        });

        const insights = [];

        //Insight 1-Savings rate
        if (income > 0) {
            const savingsRate = ((income - expense) / income) * 100;

            if (savingsRate > 50) {
                insights.push("Great job! You are saving more than 50% of your income.");
            } else if (savingsRate < 20) {
                insights.push("Your savings are below 20%. Try to reduce expenses.");
            }
        }

        //Insight 2- Top category
        let maxCategory = null;
        let maxAmount = 0;

        for (let cat in categoryMap) {
            if (categoryMap[cat] > maxAmount) {
                maxAmount = categoryMap[cat];
                maxCategory = cat;
            }
        }

        if (maxCategory) {
            insights.push(`Your highest spending category is ${maxCategory}.`);
        }

        //Insight 3- Expense > Income warning
        if (expense > income) {
            insights.push("Warning: Your expenses are higher than your income.");
        }

        res.json({ insights });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//export json to CSV
exports.exportCSV = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const records = await Record.find({ user: userId }).lean();

        if (!records.length) {
            return res.status(404).json({ message: "No records found" });
        }

        // select fields
        const fields = ["amount", "type", "category", "date", "note"];

        const parser = new Parser({ fields });
        const csv = parser.parse(records);

        res.header("Content-Type", "text/csv");
        res.attachment("records.csv");

        return res.send(csv);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};