const express = require("express");
const app = express();

const port = 3000;
const route = require("./router/api")

app.use("/api", route)

app.listen(port, () => {
    console.log("Server ayağa kaldırıldı")
})