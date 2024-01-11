const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  },
  email: {
    type: String,
    unique: false, 
    sparse: true, 
  },
  phone: {
    type: String,
    unique: false, 
    sparse: true, 
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

userSchema.index(
  { email: 1, phone: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $exists: true },
      phone: { $exists: true },
    },
  }
);


const User = mongoose.model('User', userSchema);
module.exports = User;
