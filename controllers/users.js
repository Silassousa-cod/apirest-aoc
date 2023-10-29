const { Pool } = require('pg');

// Configuração da conexão com o banco de dados usando variáveis de ambiente
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use a variável de ambiente DATABASE_URL
});

// Controladores para CRUD
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const query = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *';
    createUser.push()
    const values = [username, email];
    const result = await pool.query(query, values);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
};

const getUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [name, email, userId];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    if (result.rowCount > 0) {
      res.json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir usuário' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

