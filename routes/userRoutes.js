const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');


//router object
const router = express.Router();

// get all user || GET
router.get('/all-users',getAllUsers);

//create user || post -- register
router.post('/register',registerController);

//login user || POST
router.post('/login',loginController);

module.exports = router;