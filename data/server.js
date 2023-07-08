var mysql = require("mysql");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var path = require('path'); // Importe o módulo 'path'
var fs = require("fs"); // Importe o módulo 'fs'

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../assets/Imagens-salvas/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password", // substitua "your_password" pela senha correta
  database: "alurageek",
});

app.use(cors());
app.use(bodyParser.json());

// Configuração para servir arquivos estáticos
app.use('/assets/images', express.static(path.join(__dirname, '../assets/Imagens-salvas')));

app.post('/adicionar-produto', upload.single('imagem'), async function (req, res) {
  var produto = req.body.produto;
  var preco = req.body.preco;
  var categoria = req.body.categoria;
  var descricao = req.body.descricao;
  var imagem = req.file ? req.file.filename : ''; // nome do arquivo da imagem

  var insertQuery = "INSERT INTO produtos (categoria, image, description, price, produto) VALUES (?, ?, ?, ?, ?)";
  var values = [categoria, imagem, descricao, preco, produto];

  try {
    await new Promise((resolve, reject) => {
      con.query(insertQuery, values, function (err, result) {
        if (err) {
          console.error('Erro ao adicionar produto:', err);
          reject(err);
        } else {
          console.log('Produto adicionado com sucesso!');
          resolve(result);
        }
      });
    });

    res.sendStatus(200); // Responde com status 200 (OK) para indicar que a inserção foi realizada com sucesso
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    res.sendStatus(500); // Responde com status 500 (Internal Server Error) caso ocorra um erro na inserção
  }
});

// Função para buscar os produtos no banco de dados
function buscarProdutos() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM produtos";
    con.query(query, (error, results) => {
      if (error) {
        console.error("Erro ao obter produtos do banco de dados:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Função para gravar os produtos em um arquivo JSON
function gravarProdutosArquivo(produtos) {
  const conteudo = JSON.stringify(produtos);
  fs.writeFileSync("../data/produtos.json", conteudo);
}

// Função principal que busca os produtos e grava no arquivo
async function atualizarProdutos() {
  try {
    const produtos = await buscarProdutos();
    gravarProdutosArquivo(produtos);
    console.log("Produtos atualizados com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar os produtos:", error);
  }
}

// Chamar a função para atualizar os produtos
atualizarProdutos();

// Rota para buscar produtos por categoria
app.get('/produtos', function (req, res) {
  var categoria = req.query.categoria;

  var selectQuery = "SELECT * FROM produtos";

  if (categoria) {
    selectQuery += " WHERE categoria = ?";
  }

  con.query(selectQuery, [categoria], function (error, results) {
    if (error) {
      console.error("Erro ao obter produtos do banco de dados:", error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, function () {
  console.log('Servidor iniciado na porta 3000');
});
