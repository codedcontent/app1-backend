const logger = (req, res, next) => {
  console.log({
    params: req.params,
    body: req.body,
  });
  next();
};

module.exports = logger;
