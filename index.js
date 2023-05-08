require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, "client", "dist")));
var port = process.env.PORT || 3000;
if (dev) {
  const webpackDev = require("./dev");
  app.use(webpackDev.comp).use(webpackDev.hot);
}
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.get("/services", (req, res) => {
  const { name } = req.params;
  res.json({
    message: `ok services will be here!`,
  });
});
app.listen(3000, function () {
  console.log("Server started on :3000");
});
