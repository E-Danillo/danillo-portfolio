const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-danillo.github.io"
]

app.use(cors({
  origin: allowedOrigins
}))

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Preencha todos os campos."
      });
    }

    if (!process.env.FORMSPREE_ENDPOINT) {
      return res.status(500).json({
        error: "Endpoint do Formspree não configurado no servidor."
      });
    }

    const response = await fetch(process.env.FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    });

    if (!response.ok) {
      return res.status(500).json({
        error: "Erro ao enviar pelo Formspree."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mensagem enviada com sucesso!"
    });

  } catch (error) {
    console.error("Erro no servidor:", error);

    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});