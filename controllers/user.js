const User = require('../model/userSchema')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  

const signup = async (req,res) => {
    const {email,phone,password,name} = req.body;
    const image = req.file ? req.file.filename : '';
    try {
        if (!email && !phone) {
            return res.status(400).json({ error: 'Provide either email or phone' });
          }
          let role = 'User';
          if(email === process.env.ADMIN_EMAIL)
        {
            role = 'Admin';
        }
        

        const oldUser = await User.findOne({ email,phone });
        if(oldUser)
        {
            return res.status(409).json({msg: "User already exists!"})
        }
        
        const hashedPassword = await bcrypt.hash(password,12);

        const newUser = await User.create({
            role,
            email,
            phone,
            password: hashedPassword,
            name,
            image
        })

        const token =  jwt.sign(
            {
                email: newUser.email,
                phone: newUser.phone,
                id: newUser._id,
                role: newUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'5d'
            }
        )
        
        res.status(200).json({result: newUser,token})
        
        
    } catch (error) {
        return res.status(500).json({
            err: error, msg:"Internal server error!"
        })
    }
}

const login =  async (req,res) => {
    const {email,phone,password} = req.body;
    try {
        if (!email && !phone || !password) {
            return res.status(400).json({ error: 'Provide either email or phone' });
          }
       
      const oldUser = await User.findOne({email,phone})
      if(!oldUser)
      {
            return res.status(404).json({msg: "User does not exists!"})
      }
    
      const correctPassword = await bcrypt.compare(password,oldUser.password)
      if(!correctPassword)
      {
        return res.status(400).json({msg: "Invalid Credentials!"})
      }

      const token = jwt.sign({
        email: oldUser.email,
        phone: oldUser.phone,
        id: oldUser._id,
        role: oldUser.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '5d'
      })
    
      res.status(200).json({result: oldUser, token});
    } catch (error){
        return res.status(500).json({err: error, msg:"Internal server error!"})
    }
}


const updateUser = async(req,res) => {
    const id = req.params.id;
    const {name,image} = req.body;
   
    try {
        const user = await User.findById(id)
            if(!user)
            {
                return res.status(404).json({msg: `No user with id ${id}`})
            }
            
            const updatedUser = await User.updateOne({name,image})
            res.status(200).json({updatedUser})
            
    } catch (error) {
        return res.status(500).json({err: error, msg:"Internal server error"})
    }
}

const deleteUser = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user)
            {
                return res.status(404).json({msg: `No user with id ${id}`})
            }
            res.status(200).json({msg: "User deleted successfully."})
    } catch (error) {
        return res.status(500).json({err: error, msg:"Internal server error"})
    }
}


module.exports = {signup,login,updateUser,deleteUser,upload};