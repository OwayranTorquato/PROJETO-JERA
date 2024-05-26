import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const databaseConnection = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conexão com o banco de dados MongoDB estabelecida com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar-se ao banco de dados:", error.message);
    }

    // Eventos de conexão do Mongoose
    mongoose.connection.on('connected', () => {
        console.log('Conectado ao banco de dados');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Erro na conexão com o banco de dados:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Desconectado do banco de dados');
    });
}

export default databaseConnection;
