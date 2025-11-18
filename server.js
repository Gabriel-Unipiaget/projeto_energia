const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
mongoose.use(cors());

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch((err) => console.error("❌ Erro ao conectar:", err));

// Exemplo de modelo
const Usuario = mongoose.model("Usuario", new mongoose.Schema({
  nome: String,
  email: String,
  ordem: String
}));

// Rotas
app.get("/", (req, res) => res.send("Servidor funcionando!"));

app.post("/usuarios", async (req, res) => {
  const novoUsuario = new Usuario(req.body);
  await novoUsuario.save();
  res.send("Usuário salvo!");
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.listen(process.env.PORT, () => console.log("🚀 Servidor rodando na porta 3000"));
