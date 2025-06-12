const { verifyToken } = require('../middleware/authJwt');

module.exports = (app) => {
  const router = require('express').Router();

  router.get('/me', verifyToken, async (req, res) => {
    const db = require('../models');
    const user = await db.user.findByPk(req.userId);

    res.json({ username: user.username, email: user.email });
  });

  app.use('/api/user', router);
};
