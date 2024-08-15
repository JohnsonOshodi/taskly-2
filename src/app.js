//app.js
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { protect } = require("./middleware/auth.js");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const organizationroutes = require("./routes/organizationRoutes");

const YAML = require("yamljs");
const {apiLimiter} = require("./middleware/rateLimiter");
const swaggerUi = require("swagger-ui-express");

const app = express();


app.use(apiLimiter);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", protect, organizationroutes);
app.use("/api", protect, boardRoutes);
app.use("/api", protect, taskRoutes);



const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri);

if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Adding the route from server.js

// Connect to Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
