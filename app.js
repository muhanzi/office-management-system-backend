const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
//routes
const marketingRoute = require("./routes/marketing_route");
const signUpRoute = require("./routes/sign_up_route");
const signInRoute = require("./routes/sign_in_route");
//
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/OfficeManagementSystem"); // will create the database OfficeManagementSystem if it is not yet there
mongoose.Promise = global.Promise; // we override the promise of mongoose with the one of the global module of Nodejs because the one of mongoose is deprecated

//GraphQL queryTypes
const userType = require("./graphQL/queryTypes/user").userType;
//GraphQL resolves
const addUser = require("./graphQL/resolves/user/addUser").addUser;
const showUser = require("./graphQL/resolves/user/showUser").showUser;
const showAllUser = require("./graphQL/resolves/user/showUser").showAllUsers;
const updateUser = require("./graphQL/resolves/user/updateUser").updateUser;
const deleteUser = require("./graphQL/resolves/user/deleteUser").deleteUser;

const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  description: "This is the root query",
  fields: () => ({
    user: {
      type: userType,
      description: "This is a single user",
      args: {
        username: {
          type: GraphQLString,
        },
      },
      resolve: (parent, args) => showUser(args.username),
    },
    users: {
      type: new GraphQLList(userType),
      description: "List of all users",
      resolve: () => showAllUser(),
    },
  }),
});

const rootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "This is the root mutation",
  fields: () => ({
    addUser: {
      type: userType,
      description: "add a user",
      args: {
        username: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
        role: {
          type: GraphQLNonNull(GraphQLString),
        },
        department: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (parent, args) => addUser(args),
    },
    updateUser: {
      type: userType,
      description: "update a user",
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString),
        },
        username: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
        role: {
          type: GraphQLString,
        },
        department: {
          type: GraphQLString,
        },
      },
      resolve: (parent, args) => updateUser(args),
    },
    deleteUser: {
      type: userType,
      description: "update a user",
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (parent, args) => deleteUser(args.id),
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

app.use(express.json()); // gives us a middleware that acts as a bodyParser // it enables us to only take json data
app.use("/api/marketing", marketingRoute);
app.use("/api/signup", signUpRoute);
app.use("/api/signin", signInRoute);
app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema: schema,
  })
);

// use Process global object (of Node) to assign an Environment variable
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});

exports.appServer = app; // we use this for writing tests
