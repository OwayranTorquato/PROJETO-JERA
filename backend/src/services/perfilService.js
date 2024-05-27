import databaseConnection from '../utils/database';
import User from '../models/usuarioSchema'; // Suponha que você tenha um modelo chamado usuarioSchema

export const listarPerfis = async (idUsuario) => {
    await databaseConnection();
    const usuario = await User.findById(idUsuario);
    return usuario ? usuario.perfis : [];
};

export const criarPerfil = async (idUsuario, dadosPerfil) => {
    await databaseConnection();

    // Encontra o usuário pelo ID
    const usuario = await User.findById(idUsuario);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    // Verifica se o usuário já possui 4 perfis
    if (usuario.perfis.length >= 4) {
        throw new Error('Não é possível adicionar mais perfis. Limite máximo atingido.');
    }

    // Adiciona o novo perfil ao array de perfis do usuário
    usuario.perfis.push(dadosPerfil);
    await usuario.save();

    return usuario.perfis;
};

export const obterPerfil = async (perfilId) => {
    await databaseConnection(); // Conecte-se ao banco de dados
    const usuario = await User.findOne({ "perfis._id": perfilId }); // Encontre o usuário que contém o perfil com o ID fornecido
    if (!usuario) {
        throw new Error('Perfil não encontrado.'); // Se o usuário não existir, lance um erro
    }
    const perfil = usuario.perfis.find(perfil => perfil._id.equals(perfilId)); // Encontre o perfil pelo ID
    if (!perfil) {
        throw new Error('Perfil não encontrado.'); // Se o perfil não existir, lance um erro
    }
    return perfil; // Retorna o perfil encontrado
};


export const adicionarFilmeFavorito = async (idUsuario, idPerfil, movieId) => {
    try {
        await databaseConnection();

        // Encontra o usuário pelo ID
        const usuario = await User.findById(idUsuario);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        // Encontra o perfil pelo ID
        const perfil = usuario.perfis.id(idPerfil);
        if (!perfil) {
            throw new Error('Perfil não encontrado.');
        }

        // Adiciona o ID do filme à lista de filmes favoritos do perfil
        perfil.filmesFavoritados.push({ id: movieId });

        // Salva as alterações no usuário
        await usuario.save();

        return perfil.filmesFavoritados;
    } catch (error) {
        throw new Error('Erro ao adicionar filme favorito: ' + error.message);
    }
};