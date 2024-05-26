import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import usuarioController from './controllers/usuarioController';
import loginUsuario from "./controllers/loginUsuario";

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
app.use('/login/usuario', loginUsuario);


// Rotas do Usuário
app.use('/geral/usuario', usuarioController);


// Porta de escuta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));