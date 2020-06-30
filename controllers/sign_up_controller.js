const signUpService = require("../services/sign_up_service");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("../privateKey.json");

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
        //  verify if user already exist
        signUpService
          .verifyUserName(results.value.username)
          .then((foundUsers) => {
            if (foundUsers.length > 0) {
              res.status(400).send("this user already exists"); // 400 bad request
              return;
            }
            // save to database
            signUpService
              .signUp(results.value)
              .then((response) => {
                // generate jwt token // for user session
                const token = jwt.sign(
                  {
                    username: response.username,
                    department: response.department,
                    role: response.role,
                    iat: new Date().getTime(), // but it is still given by default even if we do not specify it //iat -->issued at // we add the timeStamp prperty to the JWT payload --> so that the token will always be different every time user logs in
                  },
                  secretKey.privateKey.JWT_SECRET_KEY,
                  { expiresIn: "1h" }
                );
                res.status(200).send({
                  message: "signed up successfully",
                  data: {
                    id: response._id,
                    username: response.username,
                    department: response.department,
                    role: response.role,
                  },
                  token: token,
                });
                next(); // pass control to the next matching route/path
              })
              .catch((error) => {
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
