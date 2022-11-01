const express = require('express');
const router = express.Router();
const partnersBranchsController = require('../../controllers/partnersBranchsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), partnersBranchsController.getAllPartnersBranchs)
    .delete(verifyRoles(ROLES_LIST.Admin), partnersBranchsController.deletePartnerBranch)
    .post(verifyRoles(ROLES_LIST.Admin), partnersBranchsController.createNewPartnerBranch);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), partnersBranchsController.getPartnerBranchs)
    .post(verifyRoles(ROLES_LIST.Admin), partnersBranchsController.updatePartnersBranch);

module.exports = router;