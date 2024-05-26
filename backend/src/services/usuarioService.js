import databaseConnection from '../utils/database';
import User from '../models/User';
import bcrypt from 'bcrypt';


export const listUsers = async () => {
    await databaseConnection();
    const users = await User.find();
    return users;
};

export const createUser = async (user) => {
    await databaseConnection();

    // Criptografar a senha usando bcrypt
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;

    // Criar o usuário no banco de dados
    const newUser = await User.create(user);
    return newUser;
};

// Service
export const updateUser = async (userId, updatedUserData) => {
    await databaseConnection();

    // Verificar se a nova senha foi fornecida
    if (updatedUserData.password) {
        // Criptografar a nova senha usando bcrypt
        updatedUserData.password = bcrypt.hashSync(updatedUserData.password, 10);
    }

    // Atualizar o usuário no banco de dados pelo ID
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    return updatedUser;
};


export const deleteUser = async (userId) => {
    await databaseConnection();
    // Excluir o usuário do banco de dados pelo ID
    await User.findByIdAndDelete(userId);
};