const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
	client_name: { type: String, required: true },
	client_id: { type: String, required: true },
	full_desc: { type: String, required: true },
	email: { type: String, required: true },
	active: { type: Boolean, required: true },
	technical_contact: { type: String, required: true },
	commercial_contact: { type: String, required: true },
});

const Partner = mongoose.model("partners", PartnerSchema);

module.exports = Partner;