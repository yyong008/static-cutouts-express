import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";
import Mustache from "mustache";

import { toAbsolutePath } from "./utils";
import { indexData } from "./data/indexData";

async function render(url) {
  const tpl = await fs.readFileSync(
    toAbsolutePath(`../views/${url}.mustache`),
    "utf-8"
  );

  const partials = tpl.matchAll(/{{>([a-zA-Z0-9\/]+)}}/g);
  const parts: string[] = [];

  for (const part of partials) {
    parts.push(part[1]);
  }

  const renderpartials = parts.reduce((prev, cur) => {
    return {
      ...prev,
      [cur]: fs.readFileSync(
        toAbsolutePath(`../views/${cur}.mustache`),
        "utf-8"
      ),
    };
  }, {});

  let html = Mustache.render(tpl, indexData, renderpartials);
  html = prettier.format(html, {
    parser: "html",
  });
  fs.writeFileSync(path.join(__dirname, `../static/${url}.html`), html);
  console.log("page rerender >", url + ".html");
}

const routes = fs
  .readdirSync(toAbsolutePath("../views/"))
  .map((file) => {
    if (!/\.mustache$/.test(file)) return null;

    return file.replace(/\.mustache$/, "").toLowerCase();
  })
  .filter((i) => i !== null);

routes.forEach((r) => {
  render(r);
});
