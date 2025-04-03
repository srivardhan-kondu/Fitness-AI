const express = require("express");
const auth = require("../middleware/auth"); // Middleware to check JWT token
const Expense = require("../models/expense");

const router = express.Router();

// ✅ Add a new expense
router.post("/", auth, async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const newExpense = new Expense({
      userId: req.user, // Extracted from token
      amount,
      category,
      description,
    });

    await newExpense.save();
    res.json(newExpense);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all expenses for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Update an expense
router.put("/:id", auth, async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { amount, category, description },
      { new: true }
    );

    if (!updatedExpense) return res.status(404).json({ msg: "Expense not found" });
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Delete an expense
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
