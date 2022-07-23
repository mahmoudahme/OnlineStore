const router = require("express").Router();
const authRepo = require('../modules/User/authRepo');
//REGISTER
router.post("/api/auth/register", authRepo.register);
//LOGIN
router.post('/api/auth/login', authRepo.login);

module.exports = router;
