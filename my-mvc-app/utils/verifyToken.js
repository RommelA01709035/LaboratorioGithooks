const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  let payload = null;
  let hasToken = false;

  try {
    if (accessToken) {
      payload = jwt.verify(accessToken, process.env.JWT_SECRET);
      hasToken = true;
    } else if (refreshToken) {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      hasToken = true;
    }

    if (payload) {
      req.user = payload;
      return next();
    }
  } catch (err) {}

  return res.status(403).json({ message: "Unauthorized", hasToken });
};

module.exports = verifyToken;
