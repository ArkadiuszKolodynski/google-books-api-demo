const express = require("express");
const app = express();
const port = process.env.npm_package_config_port;

app.use((req, _res, next) => {
  console.log(
    "%s - Request %s: %s",
    new Date().toLocaleString(),
    req.method,
    req.url
  );
  next();
});
app.use(express.static("dist"));
app.listen(port, () => console.log("\nserver is listening on *:%d\n", port));
