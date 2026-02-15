const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get('/health', (req, res) => {
  res.json({
    status: 'Pedidos OK',
    version: '1.0.0',
    ambiente: 'Kubernetes',
    timestamp: new Date()
  });
});

app.get('/pedidos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedidos');

    res.json({
      total: result.rows.length,
      pedidos: result.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
});

app.listen(3000, () => {
  console.log("Pedidos rodando");
});
