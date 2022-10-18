const { validateEmail } = require("../helpers/validation");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      username,
      birthyear,
      birthmonth,
      birthday,
      gender,
    } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "please enter a valid email",
      });
    }
    if (!validateLength(firstname, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 30",
      });
    }
    if (!validateLength(password, 6, 30)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters",
      });
    }
    if (!validateLength(lastname, 3, 30)) {
      return res.status(400).json({
        message: "lastname name must be between 3 and 30",
      });
    }
    const cryptedpassword = await bcrypt.hash(password, 12);
    // return;
    const user = await new User({
      firstname,
      lastname,
      email,
      password,
      username,
      birthyear,
      birthmonth,
      birthday,
      gender,
    }).save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login=exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.firstname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credential");
  }
});
exports.generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn:'30d'
  })
}