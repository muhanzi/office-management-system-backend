const marketingService = require("../services/marketing_service");

exports.showAll = (req, res, next) => {
  res.send("showAll is working okok");
};

exports.showOne = (req, res, next) => {
  if (req.params.id == 1) {
    res.send(marketingService.showOne(req.params.id));
    next();
  } else {
    next(new Error("id given is invalid"));
  }
};
