const signInService = require("../services/sign_in_service");
const joi = require("joi");
const bcrypt = require("bcrypt");

exports.signIn = (req, res, next) => {
  if (req.body != null) {
    const schema = {
      username: joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,40}$/)
        .required(),
      password: joi.string().min(4).max(8).required(),
    };
    // validate
    const results = joi.validate(req.body, schema);
    if (results.error) {
      const message = {
        status_code: "that was a bad request",
        error: results.error,
      };
      res.status(400).send(message); // 400 bad request
      return;
    }
    signInService
      .signIn(results.value.username)
      .then((response) => {
        // compare passwords
        bcrypt
          .compare(results.value.password, response.password)
          .then((areEqual) => {
            if (areEqual) {
              res.status(200).send(response);
              next();
            } else {
              next(new Error("password is incorrect"));
            }
          })
          .catch((error) => {
            next(new Error(error));
          });
      })
      .catch((error) => {
        next(new Error("username is invalid "));
      });
  } else {
    next(new Error("the request data is empty"));
  }
};
