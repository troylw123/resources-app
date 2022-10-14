const User = require('../models/user');
const Link = require('../models/link');

exports.read = (req, res) => {
  User.findOne({ username: req.profile.username }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
    Link.find({ postedBy: user })
      .populate('categories', 'name slug')
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 })
      .exec((err, links) => {
        if (err) {
          return res.status(400).json({
            error: 'User links not found'
          })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json({ user, links })
      })
  })
};
