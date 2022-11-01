const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema({
	branch_id: { type: String, required: true }
});

const Branch = mongoose.model("branchs", branchSchema);

module.exports = Branch;