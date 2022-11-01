const express = require('express');
const router = express.Router();
const branchsController = require('../../controllers/branchsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), branchsController.getAllBranchs)
    .delete(verifyRoles(ROLES_LIST.Admin), branchsController.deleteBranch)
    .post(verifyRoles(ROLES_LIST.Admin), branchsController.createNewBranch);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), branchsController.getBranch);

module.exports = router;