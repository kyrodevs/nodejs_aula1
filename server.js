const express = require('express')
const app = express()


let port = process.env.PORT || 3000

app.use(express.json())

// app.use('/site',clientRouter)

const knex = require('knex') ({
    client: 'pg',
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
})

// const lista_produtos = {
//     produtos: [
//         {id:1, descricao: "Feijao Preto 1Kg", marca:"Pink", valor:"8.0"},
//         {id:2, descricao: "Detergente Liquido 500ml", marca:"Ype", valor:"3.0"},
//         {id:3, descricao: "Lidileite", marca:"Itambe", valor:"5.0"}
//     ]
// }

app.use('/site',express.static('public'))

app.get('/', function (req,res){
    res.send('Working');
    //res.json(lista_produtos);
})

app.get('/api/produtos', function(req,res) {
    knex
        .select('*')
        .from('produto')
        .then (produtos => res.json(produtos))
    // res.json(lista_produtos)
    // res.end()
})

app.get('/api/produtos/:id ? type=xpto', function(req,res) {
    console.log('Cabecalho: ' + req.get('Sec-Fetch-Site'));
        let id = Number.parseInt(req.params.id)
        let idx = lista_produtos.findIndex(elem => elem.id == id)
        if (idx > -1) {
            res.json(lista_produtos[idx])
        } else {
            res.status(404).json ({message: "Produto nao encontrado."})
        }

});

app.post('/api/produtos', function(req,res){
    const{id, descricao, valor, marca} = req.body;

    const produto = {
        id,
        descricao,
        valor,
        marca
    };

    Number.parseInt(req.params.id);
    let IdInformado = lista_produtos.produtos.findIndex(elem => elem.id == id);

    if(IdInformado < 0){
        lista_produtos.produtos.push(produto);
        return res.json(lista_produtos.produtos);
    } else {
        res.status(400).json({message: "Produto ja cadastrado"});
    }
})

app.delete('/api/produtos/:id', function(req,res){
    let id = Number.parseInt(req.params.id);
    let IdInformado = lista_produtos.produtos.findIndex(elem => elem.id == id);

    var index = lista_produtos.produtos.indexOf(id);

    if(IdInformado > -1){
        lista_produtos.produtos.splice(index,1);
        return res.json(lista_produtos.produtos);
    } else {
        res.status(404).json({message: "Produto nao encontrado"});
    }
});

app.put('/api/produtos/:id' , function(req,res){
    const{id, descricao, valor, marca} = req.body;

    const produto = {
        id,
        descricao,
        valor,
        marca
    };

    let idx = Number.parseInt(req.params.id);
    let IdInformado = lista_produtos.produtos.findIndex(elem => elem.id == idx);

    if(IdInformado > -1){
        let prod = lista_produtos.produtos.indexOf(idx);
        prod.id = produto.id;
        prod.descricao = produto.descricao;
        prod.valor = produto.valor;
        prod.marca = produto.marca;

        res.status(200).json({
            message: "Produto foi atualizado com sucesso!",
            produto: produto
        });
    } else{
        res.status(404).json({message: "Produto nao encontrado"});
    }

});

app.listen(port, function () {
    console.log('Servidor rodando na porta 3000')
})






