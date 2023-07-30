
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
exports.register = async function (req, res) {
  const { name, password, email, profilePic } = req.body;
  const newUser = new User({
    name,
    email,
    profilePic,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
  });
  try {
    const user = await newUser.save();
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGIN
exports.login = async function (req, res) {
  const { password, email, name } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.json({ msg: "User not found!" });
      }
      if (user) {
        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.SECRET_KEY
        );
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== password) {
          res.status(401).json({ msg: "Wrong password or username" });
        } else {
          const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );
          const { password, ...info } = user._doc;
          res.status(200).json({
            msg: "welcome" + info.name,
            accessToken,
            ...info,
          });
        }
      }
    })
    .catch((error) => res.json({ error: error.message }));
};
