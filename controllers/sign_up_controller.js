const signUpService = require("../services/sign_up_service");
const joi = require("joi");
const bcrypt = require("bcrypt");

exports.signUp = (req, res, next) => {
  if (req.body != null) {
    const schema = {
      username: joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,40}$/)
        .required(),
      password: joi.string().min(4).max(8).required(),
      department: joi.string().required(),
      role: joi.string().required(),
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
    //encrypt password before saving
    bcrypt
      .hash(req.body.password, 10) // 10 --> rounds // of hashing the password
      .then((encryptedPassword) => {
        results.value.password = encryptedPassword;
        // save to database
        signUpService
          .signUp(results.value)
          .then((response) => {
            res.status(200).send(response);
            next(); // pass control to the next matching route/path
          })
          .catch((error) => {
            next(new Error(error));
          });
      })
      .catch((error) => {
        next(new Error(error));
      });
  } else {
    next(new Error("the request data is empty"));
  }
};

exports.update = (req, res, next) => {
  if (req.body != null) {
    const schema = {
      username: joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,40}$/)
        .required(),
      password: joi.string().min(4).max(8).required(),
      department: joi.string().required(),
      role: joi.string().required(),
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
    //encrypt password before updating
    bcrypt
      .hash(req.body.password, 10) // 10 --> rounds // of hashing the password
      .then((encryptedPassword) => {
        results.value.password = encryptedPassword;
        // update
        signUpService
          .update({ user: results.value, id: req.params.id })
          .then((response) => {
            // response --> old document
            // retrieve the updated document
            signUpService
              .showOne(req.params.id)
              .then(function (response) {
                res.status(200).send(response);
                next();
              })
              .catch(function (error) {
                next(new Error(error));
              });
          })
          .catch((error) => {
            next(new Error(error));
          });
      })
      .catch((error) => {
        next(new Error(error));
      });
  } else {
    next(new Error("the request data is empty"));
  }
};

exports.delete = (req, res, next) => {
  signUpService
    .delete(req.params.id)
    .then((response) => {
      res.status(200).send(response);
      next();
    })
    .catch((error) => {
      next(new Error(error));
    });
};
