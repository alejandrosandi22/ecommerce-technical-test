const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    token = req.headers['x-access-token'];
  }

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

isAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    return next();
  }
  res.status(403).send({ message: 'Require Admin Role!' });
};

module.exports = { verifyToken, isAdmin };
