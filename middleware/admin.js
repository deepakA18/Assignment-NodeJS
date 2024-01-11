const jwt = require('jsonwebtoken');
// const Admin = require('../model/adminSchema');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if(!authHeader)
    {
      return res.status(401).json({ error: 'jwt must be provided' });
    }
    const token = authHeader.split(' ')[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedData.role !== 'Admin') {
      return res.status(403).json({ error: 'Access forbidden. Admin access required.' });
    }

    req.adminId = decodedData.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Authentication failed. Please log in again.' });
  }
};

module.exports = authMiddleware;
