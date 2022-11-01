const Branchs = require('../model/Branchs');

const getAllBranchs = async (req, res) => {
    const branchs = await Branchs.find();
    if (!branchs) return res.status(204).json({ 'message': 'No branchs found' });
    res.json(branchs);
}

const deleteBranch = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Branchs ID required' });
    const branch = await Branchs.findOne({ _id: req.body.id }).exec();
    if (!branch) {
        return res.status(204).json({ 'message': `Branchs ID ${req.body.id} not found` });
    }
    const result = await branch.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getBranch = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Branchs ID required' });
    const branch = await Branchs.findOne({ _id: req.params.id }).exec();
    if (!branch) {
        return res.status(204).json({ 'message': `Branchs ID ${req.params.id} not found` });
    }
    res.json(branch);
}

const createNewBranch = async (req, res) => {
    if (!req?.body?.branch_id) {
        return res.status(400).json({ 'message': 'Branch ID is required' });
    }

    try {
        const result = await Branchs.create({
            branch_id: req.body.branch_id
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllBranchs,
    deleteBranch,
    getBranch,
    createNewBranch
}