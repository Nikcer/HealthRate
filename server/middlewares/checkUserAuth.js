const checkAuthorization = (req, res, next) => {
  const reqUserId = req.params.id;
  const tokenId = req.user._id;

  if (tokenId !== reqUserId) {
    return res.status(403).json({ error: "User is not authorized" });
  }

  next();
};

module.exports = checkAuthorization;
