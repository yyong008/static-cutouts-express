import fs from "node:fs";

// express
import express from "express";
import mustacheExpress from "mustache-express";

// config
import cutConfig from "./cutout.config";

// utils
import { toAbsolutePath } from "./utils/utils"

const routes = fs
  .readdirSync(toAbsolutePath(import.meta, "./views/"))
  .map((file) => {
    if (!/\.mustache$/.test(file)) return null;

    return file.replace(/\.mustache$/, "").toLowerCase();
  })
  .filter((i) => i !== null);

const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", toAbsolutePath(import.meta, "./views"));

app.use("/static", express.static("static"));

routes.forEach((route) => {
  let url = route === "index" ? "/" : `/${route}`;
  
  app.get(url, async (_, res) => {
    let data = (await import(`./data/${route}.ts`)).default;
    res.render(route as string, data);
  });
});

app.listen(cutConfig.port, () => {
  console.log("server listening on port: ", cutConfig.port);
});
