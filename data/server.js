var mysql = require("mysql");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var path = require('path'); // Importe o módulo 'path'
var fs = require("fs"); // Importe o módulo 'fs'

const port = process.env.PORT || 3000;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../assets/Imagens-salvas/');
  },
  filename: function (req, file, cb) {
    var fileName = file.fieldname + '-' + Date.now() + '-' + file.originalname;
    req.fileName = fileName; // Adiciona o nome do arquivo à requisição
    cb(null, fileName);
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
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos
app.use('/assets/images', express.static(path.join(__dirname, '../assets/Imagens-salvas')));

app.post('/adicionar-produto', upload.single('imagem'), async function (req, res) {
  var produto = req.body.produto;
  var preco = req.body.preco;
  var categoria = req.body.categoria;
  var descricao = req.body.descricao;
  var imagem = req.fileName ? path.basename(req.fileName) : ''; // nome do arquivo da imagem

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

// ...


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
  fs.writeFileSync("./data/produtos.json", conteudo);
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

// Rota para obter informações de um produto específico
app.get('/produto/:id', function (req, res) {
  var id = req.params.id;

  var selectQuery = "SELECT * FROM produtos WHERE id = ?";

  con.query(selectQuery, [id], function (error, results) {
    if (error) {
      console.error("Erro ao obter informações do produto:", error);
      res.sendStatus(500);
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.sendStatus(404); // Produto não encontrado
      }
    }
  });
});

// Rota para editar um produto
app.put('/produto/:id', function (req, res) {
  var id = req.params.id;
  var produto = req.body.produto;
  var preco = req.body.preco;
  var categoria = req.body.categoria;
  var descricao = req.body.descricao;
  var imagem = req.body.imagem; // Adicionado o campo "imagem"

  var updateQuery = "UPDATE produtos SET produto = ?, price = ?, categoria = ?, description = ?, image = ? WHERE id = ?";
  var values = [produto, preco, categoria, descricao, imagem, id];

  con.query(updateQuery, values, function (err, result) {
    if (err) {
      console.error('Erro ao editar produto:', err);
      res.sendStatus(500);
    } else {
      console.log('Produto editado com sucesso!');
      res.sendStatus(200);
    }
  });
});

// Rota para excluir um produto
app.delete('/produto/:id', function (req, res) {
  var id = req.params.id;

  var deleteQuery = "DELETE FROM produtos WHERE id = ?";

  con.query(deleteQuery, [id], function (err, result) {
    if (err) {
      console.error('Erro ao excluir produto:', err);
      res.sendStatus(500);
    } else {
      console.log('Produto excluído com sucesso!');
      res.sendStatus(200);
    }
  });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Caminho do arquivo usuario.json
var filePath = path.join(__dirname, 'usuario.json');

// Rota para adicionar um novo usuário
app.post('/usuarios', function (req, res) {
  console.log('Requisição recebida na rota de adicionar usuário');

  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;

  // Lógica para adicionar os dados ao arquivo usuario.json
  var usuario = {
    nome: nome,
    email: email,
    senha: senha
  };

  // Lê os usuários existentes do arquivo
  var data = fs.readFileSync(filePath, 'utf8');
  var usuarios = JSON.parse(data);

  // Adiciona o novo usuário ao array existente
  usuarios.push(usuario);

  // Salva os dados atualizados no arquivo
  fs.writeFileSync(filePath, JSON.stringify(usuarios));

  // Retorna a resposta de sucesso
  res.status(200).json(usuario);
});

// Rota para obter todos os usuários cadastrados
app.get('/usuarios', function (req, res) {
  console.log('Requisição recebida na rota de obter usuários');

  // Lê os usuários existentes do arquivo
  var data = fs.readFileSync(filePath, 'utf8');
  var usuarios = JSON.parse(data);

  // Retorna os usuários cadastrados
  res.status(200).json(usuarios);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});