const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {User} = require('../../db/models');

router.post('/register', async (req, res, next) => {
  try {
    // expects {username, email, password} in req.body
      const {username, password, email} = req.body;

    if (!username || !password || !email) {
        return res
            .status(400)
            .json({error: 'Username, password, and email required'});
    }

    if (password.length < 6) {
        return res
            .status(400)
            .json({error: 'Password must be at least 6 characters'});
    }

    const user = await User.create(req.body);

    const token = jwt.sign(
        {id: user.dataValues.id},
        process.env.SESSION_SECRET,
        {expiresIn: 86400},
    );
    res.cookie('access-token', token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.json({
      ...user.dataValues,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(401).json({error: 'User already exists'});
    }
    if (error.name === 'SequelizeValidationError') {
        return res.status(401).json({error: 'Validation error'});
    }
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
      // expects username and password in req.body
      const {username, password} = req.body;
      if (!username || !password) return res.status(400).json({error: 'Username and password required'});

      const user = await User.findOne({
          where: {
              username: req.body.username,
          },
      });

      if (!user) {
          console.log({error: `No user found for username: ${username}`});
          res.status(401).json({error: 'Wrong username and/or password'});
      } else if (!user.correctPassword(password)) {
          console.log({error: 'Wrong username and/or password'});
          res.status(401).json({error: 'Wrong username and/or password'});
      } else {
          const token = jwt.sign(
              {id: user.dataValues.id},
              process.env.SESSION_SECRET,
              {expiresIn: 86400},
          );
          res.cookie('access-token', token, {
              expires: new Date(Date.now() + 86400000),
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
      });
      res.json({
        ...user.dataValues,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', (req, res, next) => {
  res.clearCookie('access-token');
  res.sendStatus(204);
});

router.get('/user', (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  }
  return res.json({});
});

module.exports = router;
