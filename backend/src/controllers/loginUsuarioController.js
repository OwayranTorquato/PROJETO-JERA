import mongoose from 'mongoose';
import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioSchema'; // Importando o modelo de usuário
import databaseConnection from '../utils/database';
import * as dotenv from 'dotenv';
dotenv.config();

const router = Router();

// Conectar ao banco de dados
databaseConnection();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Validação
    if (!email || !password) {
        return res.status(422).json({ message: 'email e senha são obrigatórios!' });
    }

    try {
        // Buscar usuário pelo email
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verificar senha
        const senhaCorreta = await bcrypt.compare(password, usuario.password);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Autenticação bem-sucedida
        const secret = process.env.SECRET;
        const tokenData = {
            id: usuario._id,
            name: usuario.name,
            email: usuario.email,
            nivelAcesso: usuario.nivelAcesso,
            // Adicionar outras informações relevantes do usuário aqui, se necessário
        };
        const token = jwt.sign(tokenData, secret); // Definindo a variável token aqui
        const responseData = { message: 'Autenticação realizada com sucesso', token };
        const responseWithUserData = Object.assign({}, responseData, tokenData);
        return res.status(200).json(responseWithUserData);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor, tente novamente mais tarde!' });
    }
});
// Busca usuário por ID mas não retorna senha
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    // Verifica se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de usuário inválido' });
    }

    try {
        // Busca o usuário pelo ID no banco de dados, excluindo o campo de senha
        const usuario = await Usuario.findById(id, '-password');

        // Se o usuário não for encontrado, retorna uma mensagem de usuário não encontrado
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retorna o usuário encontrado com status 200
        return res.status(200).json(usuario);

    } catch (error) {
        // Em caso de erro interno do servidor, retorna uma mensagem de erro
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor, tente novamente mais tarde!' });
    }
});

// Função middleware para verificar o token de autenticação
export function checkUsuarioToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso Negado! Token ausente ou inválido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const secret = process.env.SECRET;
        const decodedToken = jwt.verify(token, secret);
        req.name = decodedToken.name; // Adiciona o nome do usuário à requisição
        req.email = decodedToken.email; // Adiciona o email do usuário à requisição
        req.userId = decodedToken._id; // Adiciona o ID do usuário à requisição
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token Inválido!' });
    }
}

export default router;
