const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Admin'
      },
})

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;