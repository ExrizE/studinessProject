const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnersBranchsSchema = new Schema({
	install_id: { type: String, required: true },
	client_id: { type: String, required: true },
	branch_id: { type: String, required: true },
	grants: { type: Object, required: true },
	active: { type: Boolean, default: false },
});

const PartnersBranchs = mongoose.model("partnersBranchs", PartnersBranchsSchema);

module.exports = PartnersBranchs;