require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const addRoutes = require("./routes/add");
const path = require('path');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname+'/public')))

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/add", addRoutes);

const port = process.env.PORT || 80;
app.listen(port, console.log(`Listening on port ${port}...`));
