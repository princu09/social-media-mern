const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

connectToMongo();

const app = express();
const port = 3001;
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Available Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));

app.listen(port, () => {
  console.log(`E-Commerce Backend app listening on port ${port}`);
});
