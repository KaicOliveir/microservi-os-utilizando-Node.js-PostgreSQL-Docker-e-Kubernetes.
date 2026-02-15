const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Gateway OK' });
});

// Proxy para pedidos
app.get('/pedidos', async (req, res) => {
  try {
    const response = await axios.get('http://pedidos:3000/pedidos');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Gateway rodando na porta ${PORT}`);
});
