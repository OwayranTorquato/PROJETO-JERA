import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import usuarioController from "./controllers/usuarioController";
import perfilController from "./controllers/perfilController"
import loginUsuarioController, { checkUsuarioToken } from "./controllers/loginUsuarioController";
import path from 'path';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Rota de Boas-vindas
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo a nossa API!' });
});

// Rotas de Autenticação
app.use('/login/usuario', loginUsuarioController);

// Rotas do Usuário
app.use('/usuario', usuarioController);

// Rota de criação de perfil para um usuario
app.use('/perfil/cadastrar', perfilController)

// Porta de escuta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
