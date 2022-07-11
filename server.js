const express = require("express");
const app = express();

const importData = require("./data.json");

const port = process.env.PORT || 3000;

app.get("/", function (req,res) {
    res.send("Leonardo Prado Cosenza");
});

app.get("/produtos", function(req, res) {
    res.send(importData);
});

app.listen(port, () => {
    console.info("Aplicacao rodando em http://localhost:3000");
});

