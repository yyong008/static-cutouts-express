import { indexData } from "../data/indexData";
import { loginData } from "../data/loginData";
import { aboutData } from "../data/aboutData";

export function handleIndex(req, res) {
  res.render("index", indexData);
}

export function handleLogin(req, res) {
  res.render("login", loginData);
}

export function handleAbout(req, res) {
  res.render("about", aboutData);
}