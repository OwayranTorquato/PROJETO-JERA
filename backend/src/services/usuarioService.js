import databaseConnection from '../utils/database';
import User from '../models/usuarioSchema';
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

