const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importe o arquivo configDb.js
// Não é mais necessário importar o arquivo configDb.js

// Configuração da conexão com o banco de dados usando variáveis de ambiente
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use a variável de ambiente DATABASE_URL
});

// Importe o controlador atualizado
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('./controllers/users'); // Supondo que o controlador esteja no arquivo './controllers/users'

// Rota para criar um usuário
app.post('/users', createUser);

// Rota para buscar todos os usuários
app.get('/users', getUsers);

// Rota para buscar um usuário pelo ID
app.get('/users/:userId', getUser);

// Rota para atualizar um usuário pelo ID
app.put('/users/:userId', updateUser);

// Rota para excluir um usuário pelo ID
app.delete('/users/:userId', deleteUser);

app.listen(port, () => {
  console.log(`API está em execução na porta ${port}`);
});
