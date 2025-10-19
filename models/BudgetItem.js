const mongoose = require('mongoose');

const BudgetItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    value: { type: Number, required: true },
    color: { type: String, required: true, match: /^#([0-9A-Fa-f]{6})$/ }
  },
  { collection: 'budget_items' }
);

module.exports = mongoose.model('BudgetItem', BudgetItemSchema);
