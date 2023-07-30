const User = require("../models/user");
const CryptoJS = require("crypto-js");

//UPDATE

exports.userUpdate = async function (req, res) {
  if (req.user.id === req.query.userId || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.query.userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({updatedUser,msg:'User has been updated!'});
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
};
//DELETE
exports.userDelete = async function (req, res) {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been delete");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
};
//GET
exports.userGetOne = async function (req, res) {
  // if (req.user.id === req.query.id) {
    const id = req.query.userId
    try {
      const user = await User.findById(id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  // } else {
  //   res.status(403).json("You can get only your account!");
  // }
};
//GET ALL
exports.userGetAll = async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
};
//GET USER STATS
exports.userStats = async (req,res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};
