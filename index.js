const express = require("express");
const app = express();
const route = require("./router/api")

const jwt = require("./helpers/jwt");
const errorHandler = require("./helpers/errorHandler")

app.use(jwt());

app.use(express.json());
app.use("/api", route)

app.use(errorHandler);
const port = 3000;

app.listen(port, () => {
    console.log("Server ayağa kaldırıldı")
})