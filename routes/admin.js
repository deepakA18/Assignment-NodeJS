const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/admin')
// const auth = require('../middleware/auth')

const {assignAdmin,createAdmin,getAllUsers,modifyUsers,deleteUsers} = require('../controllers/admin')

router.post('/createaccount',authMiddleware,createAdmin)
router.get('/userdetails',authMiddleware,getAllUsers) 
router.patch('/updateuser/:id',authMiddleware,modifyUsers)
router.delete('/deleteuser/:id',authMiddleware,deleteUsers)

module.exports = router;