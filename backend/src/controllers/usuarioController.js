import { Router } from "express";
import { createUser, updateUser, deleteUser, listUsers } from "../services/usuarioService";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.cpf) {
            res.status(400).json({ message: 'Já existe um usuário com esse CPF no banco!' });
        } else if (error.message.includes('required')) {
            res.status(400).json({ message: 'Informação obrigatória não foi enviada pelo formulário.' });
        } else {
            res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const userlist = await listUsers();
        res.status(200).json(userlist);
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
});

router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const updatedUser = await updateUser(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.cpf) {
            res.status(400).json({ message: 'Já existe um usuário com esse CPF no banco!' });
        } else if (error.message.includes('required')) {
            res.status(400).json({ message: 'Informação obrigatória não foi enviada pelo formulário.' });
        } else {
            res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
        }
    }
});

router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
});

export default router;
