const db = require('../models');
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  try {
    await User.create({ username, email, password: hash, role });
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(404).send({ message: 'User Not Found' });

  const isValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isValid)
    return res
      .status(401)
      .send({ accessToken: null, message: 'Invalid Password!' });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );

  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    accessToken: token,
  });
};
