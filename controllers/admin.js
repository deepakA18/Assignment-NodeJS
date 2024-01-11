const bcrypt = require('bcrypt');

const User = require('../model/userSchema');
const Admin = require('../model/adminSchema');


const createAdmin = async(req,res) =>{
    const {email,password} = req.body;
    if(!email)
    {
        return res.status(400).json({msg: "Please provide email!"})
    }
    try {
        const oldAdmin = await Admin.findOne({email})
        if(oldAdmin)
        {
            return res.status(409).json({msg: "Email already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newAdmin = await Admin.create({
            role: 'Admin',
            email,
            password: hashedPassword
        })
        
        res.status(200).json({newAdmin})

    } catch (error) {
        return res.status(500).json({err: error})
    }
}

const getAllUsers = async (req,res) => {
    try {
            const users = await User.find({})
            res.status(200).json({users});
    
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

const modifyUsers = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id,req.body,{
            runValidators: true,
            new:true
        });
        if(!user)
        {
            return res.status(404).json({msg: "User does not exists!"});
        }
        res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

const deleteUsers = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user)
        {
            return res.status(404).json({msg: "User does not exists!"});
        }
        res.status(200).json({user, msg: `User deleted successfully with id:${id}`})
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

module.exports = {createAdmin,getAllUsers,modifyUsers,deleteUsers};



