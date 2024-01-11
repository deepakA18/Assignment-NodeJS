const express = require('express');
const router = express.Router();

const {signup,login,updateUser,deleteUser,upload} = require('../controllers/user')

const auth = require('../middleware/auth')



router.post('/signup',upload.single('image'),signup);
router.post('/login',auth,login)
router.patch('/:id',auth,updateUser);
router.delete('/:id',auth,deleteUser);


module.exports = router;