const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRouter");
const authRoute = require("./routes/authRouter");
const productRoute = require("./routes/productRouter");
// const cartRoute = require("./routes/cart");
// const orderRoute = require("./routes/order");
const cors = require("cors");
const URL = "mongodb://localhost:27017/Commerce" ;

mongoose
  .connect(URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(authRoute);
app.use(userRoute);
app.use(productRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);


app.listen(1000, () => {
  console.log("Backend server is running!");
});
