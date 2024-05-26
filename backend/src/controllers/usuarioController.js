import { Router } from "express";
import { checkToken } from '../controllers/loginUsuarioController';
import { listUsers, createUser } from "../services/usuarioService"; // Importando funções do serviço de usuário

const router = Router();

// Rota para criar um novo usuário
router.post('/cadastrar', async (req, res) => {
    try {
        const user = await createUser(req.body); // Chama a função para criar um usuário com os dados recebidos no corpo da requisição
        res.status(201).json(user); // Retorna o usuário criado com o status 201 (Created)
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            res.status(400).json({ message: 'Já existe um usuário com esse Email no banco!' });
        } else if (error.message.includes('required')) {
            res.status(400).json({ message: 'Informação obrigatória não foi enviada pelo formulário.' });
        } else {
            res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
        }
    }
});

// Rota para listar usuários
router.get('/listar', async (req, res) => {
    try {
        const userlist = await listUsers(); // Chama a função para listar usuários
        res.status(200).json(userlist); // Retorna a lista de usuários
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
});



export default router;
