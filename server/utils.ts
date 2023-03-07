import { resolve } from "path";

export const toAbsolutePath = (p) => resolve(__dirname, p);
