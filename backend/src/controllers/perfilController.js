import { Router } from "express";
import { criarPerfil, listarPerfis, obterPerfil, adicionarFilmeFavorito } from "../services/perfilService"; // Importando função do serviço de perfil

const router = Router();

// Rota para criar um novo perfil para um usuário existente
router.post('/:idUsuario', async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario; // Obtém o ID do usuário da URL
        const perfil = await criarPerfil(idUsuario, req.body); // Chama a função para criar um perfil para o usuário
        res.status(201).json(perfil); // Retorna o perfil criado com o status 201 (Criado)
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para listar os perfis de um usuário
router.get('/listar/:idUsuario', async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario; // Obtém o ID do usuário da URL
        const perfis = await listarPerfis(idUsuario); // Chama a função para listar os perfis do usuário
        res.status(200).json(perfis); // Retorna os perfis do usuário
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para acessar um perfil específico de um usuário
router.get('/:idPerfil', async (req, res) => {
    try {
        const idPerfil = req.params.idPerfil; // Obtém o ID do perfil da URL
        const perfil = await obterPerfil(idPerfil); // Função para obter o perfil pelo ID
        if (perfil.generosPreferidos.length === 0) {
            // Se o perfil não tiver gêneros preferidos, exigir que o usuário selecione pelo menos 3 gêneros
            return res.status(400).json({ message: 'Você precisa selecionar pelo menos 3 gêneros preferidos.' });
        }
        res.status(200).json(perfil); // Retorna o perfil
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para adicionar um filme favorito ao perfil de um usuário
router.post('/:idUsuario/:idPerfil/movieId', async (req, res) => {
    try {
        const { idUsuario, idPerfil } = req.params;
        const { movieId } = req.body;

        // Chama a função do serviço para adicionar o filme favorito ao perfil do usuário
        const filmesFavoritos = await adicionarFilmeFavorito(idUsuario, idPerfil, movieId);

        // Retorna os filmes favoritos atualizados do perfil do usuário
        res.status(200).json(filmesFavoritos);
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor: ' + error.message });
    }
});

export default router;
