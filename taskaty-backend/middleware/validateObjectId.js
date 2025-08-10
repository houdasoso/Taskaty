// Optional middleware to validate :id params as ObjectId to avoid CastError
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
};
