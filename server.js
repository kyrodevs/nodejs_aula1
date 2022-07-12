const express = require("express");
const {Pool} = require('pg');
require('dotenv').config();
const app = express();

const importData = require("./data.json");

const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
});

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Leonardo Prado Cosenza");
});

app.get("/meus_produtos", async (req, res) => {
    try {
        const produtos = await pool.query("SELECT * FROM produtos");
        console.log(produtos);
    } catch(err) {
        return res.status(400).send(err);
    }
});

app.post("/add_produto", async(req,res) => {
    const { descricao } = req.body;
    const { valor } = req.body;
    const { marca } = req.body;
    try {
        const meusProdutos = await pool.query('INSERT INTO meus_produtos(descricao,valor,marca) VALUES ($1,$2,$3) RETURNING *',[descricao,valor,marca]);
        return res.status(200).send(meusProdutos);
    } catch(err){
        return res.status(400).send(err);
    }
})

app.listen(port, () => {
    console.info("Aplicacao rodando em http://localhost:3000");
});

