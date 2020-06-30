const signInService = require("../services/sign_in_service");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("../privateKey.json");

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
              // generate jwt token  // syncrhonous way
              // const token = jwt.sign(
              //   {
              //     username: response.username,
              //     department: response.department,
              //     role: response.role,
              //     iat: new Date().getTime(), // but it still given by default even if we do not specify it //iat -->issued at // we add the timeStamp prperty to the JWT payload --> so that the token will always be different every time user logs in
              //   },
              //   secretKey.privateKey.JWT_SECRET_KEY,
              //   { expiresIn: "1h" }
              // );
              // res.status(200).send({
              //   message: "signed in successfully",
              //   data: {
              //     id: response._id,
              //     username: response.username,
              //     department: response.department,
              //     role: response.role,
              //   },
              //   token: token,
              // });
              //generate jwt token  // asyncrhonous way
              jwt.sign(
                {
                  username: response.username,
                  department: response.department,
                  role: response.role,
                  iat: new Date().getTime(), //iat -->issued at // we add the timeStamp prperty to the JWT payload --> so that the token will always be different every time user logs in // but it still given by default even if we do not specify it
                },
                secretKey.privateKey.JWT_SECRET_KEY,
                { expiresIn: "1h" },
                function (error, token) {
                  if (token) {
                    res.status(200).send({
                      message: "signed in successfully",
                      data: {
                        id: response._id,
                        username: response.username,
                        department: response.department,
                        role: response.role,
                      },
                      token: token,
                    });
                    return;
                  }
                  res
                    .status(500)
                    .send({ message: "authentiation failed", error: error });
                }
              );
              //
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
