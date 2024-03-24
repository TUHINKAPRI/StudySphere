const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { connectToDb } = require("./config/db.connection");
const { connectToCloudinary } = require("./config/cloudinary.connection");

const userRouter = require("./routes/user.routes");
const profileRouter = require("./routes/profile.routes");
const courseRouter = require("./routes/course.routes");
const paymentRouter = require("./routes/payments.routes.js");
const { dummyuserdata, dummycoursedata } = require("./config/dummyData.js");
connectToDb();
connectToCloudinary();
// dummyuserdata()
// dummycoursedata()
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is started in port no ${PORT}`);
});
