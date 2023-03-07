import express from "express";
import mustacheExpress from "mustache-express";
import { toAbsolutePath } from "./utils"

import * as ctrs from "./controllers";

const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", toAbsolutePath("../views"));

app.use("/static", express.static("static"));

app.get("/", ctrs.handleIndex);
app.get("/login", ctrs.handleLogin);
app.get("/about", ctrs.handleAbout);

const server = app.listen(9210, () => {
  const { address = "localhost", port } = server.address() as any;

  console.log("Example app listening at http://%s:%s", "localhost", port);
});
