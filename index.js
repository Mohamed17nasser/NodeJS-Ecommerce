
// const express = require("express");
// const app = express();
// const port = 3000;
// const cors = require("cors");
// require("./db.js");
// require("dotenv/config");
// const userRoutes = require("./Routes/userRoutes.js");
// const productRoutes = require("./Routes/productRoutes.js");
// const categoryRoutes = require("./Routes/orderRoutes.js");
// const orderRoutes = require("./Routes/orderRoutes.js");


// app.use(cors());
// app.options("*", cors());

// //////////////MiddleWares////////////////
// app.use(express.json());
// app.use(express.urlencoded());
// // const authenticateUser=require('./MiddleWhere/authenticateUser.js'); //for token authentication before loggin
require('express-async-errors');

// //////////////Routes////////////////
// app.use("/users", userRoutes);
// // app.use("/products", authenticateUser, productRoutes);
// // app.use("/categories", authenticateUser, categoryRoutes);
// // app.use("/orders", authenticateUser, orderRoutes);

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("./db.js");
require("dotenv/config");
const userRoutes = require("./Routes/userRoutes.js");
const productRoutes = require("./Routes/productRoutes.js");
const categoryRoutes = require("./Routes/orderRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");

app.use(cors());
app.options("*", cors());

//////////////MiddleWares////////////////
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//////////////Routes////////////////
app.use("/users", userRoutes);
 app.use("/products", productRoutes);
 app.use("/categories",  categoryRoutes);
 app.use("/orders",  orderRoutes);
app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


// Add console logs to identify potential issues
console.log("Server code executed");
