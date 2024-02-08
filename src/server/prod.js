const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.prod"),
});
const express = require("express");
const consola = require("consola");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
// Import and Set Nuxt.js options


const { Nuxt, Builder } = require("nuxt");

const app = express();

const httpServer = http.createServer(app);

const config = require("../../nuxt.config.js");

app.use(helmet());
app.use(cors());

app.post("/nova-transacao", (req, res) => {
  if (req.body.includes('\r') || req.body.includes('\r\n')) {
    return;  }
  res.send("AlreadySaved");
});

app.post("/transaction/confirm", (req, res) => {
  if (req.body.includes('\r') || req.body.includes('\r\n')) {
    return;
  }
  res.send("AlreadySaved");
});

const host = process.env.HOST;
const port = process.env.PORT;

// app.set("port", port);


config.dev = false;
config.env = require("../../env");

app.get("/", (req, res) => {
  res.redirect("/login");
});
app.get("*", (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache");
  next();
});

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode

  const builder = new Builder(nuxt);
  await builder.build();


  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  // app.listen(port, host);

  httpServer.listen(80, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    });
  });
}


start();
