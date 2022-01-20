const express = require("express");
const app = express();

const route = require("./router/api")
const jwt = require("./helpers/jwt");

app.use(jwt());
app.use(express.json());


app.use("/api", route)


const port = 3000;
app.listen(port, () => {
    console.log("Server ayağa kaldırıldı")
})