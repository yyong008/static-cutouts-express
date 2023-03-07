import defineVars from "iesmo";

// node
import { resolve } from "path";

export const toAbsolutePath = (importMeta, p) => {
  let { __dirname } = defineVars(importMeta);
  return resolve(__dirname, p);
}