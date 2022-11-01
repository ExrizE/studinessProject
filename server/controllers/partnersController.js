const Partners = require('../model/Partners');

const getAllPartners = async (req, res) => {
    const partners = await Partners.find();
    if (!partners) return res.status(204).json({ 'message': 'No partners found' });
    res.json(partners);
}

const deletePartner = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Partners ID required' });
    const partner = await Partners.findOne({ _id: req.body.id }).exec();
    if (!partner) {
        return res.status(204).json({ 'message': `Partners ID ${req.body.id} not found` });
    }
    const result = await partner.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getPartner = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Partners ID required' });
    const partner = await Partners.findOne({ _id: req.params.id }).exec();
    if (!partner) {
        return res.status(204).json({ 'message': `Partners ID ${req.params.id} not found` });
    }
    res.json(partner);
}

const createNewPartner = async (req, res) => {
    const partner = await Partners.findOne({ client_id: req.body.client_id });
    if (partner)
        return res
            .status(409)
            .json({ 'message': 'Branch ID is required' });
    try {
        const result = await Partners.create({
            ...req.body
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllPartners,
    deletePartner,
    getPartner,
    createNewPartner
}