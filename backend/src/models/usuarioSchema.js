import mongoose from 'mongoose';

const { Schema } = mongoose;

const generoSchema = new Schema({
  genero: {
    type: String
  },
});

const filmesFavoritosSchema = new Schema({
  id: {
    type: String
  }
});


const perfilUsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true,
    maxlength: 12
  },
  generosPreferidos: [generoSchema],
  filmesFavoritados: [filmesFavoritosSchema]
});

const usuarioSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  perfis: [perfilUsuarioSchema]
});

// Middleware para criar automaticamente o primeiro perfil ao criar um usuário
usuarioSchema.pre('save', function(next) {
  // Verifica se o usuário não possui nenhum perfil
  if (this.perfis.length === 0) {
    // Cria um perfil com o primeiro nome do usuário
    this.perfis.push({ nome: this.name.split(' ')[0] });
  }
  next();
});

// Middleware para limitar o número de perfis por usuário em 4
usuarioSchema.pre('save', function(next) {
  if (this.perfis.length > 4) {
    return next(new Error('Não é possível ter mais de 4 perfis por usuário.'));
  }
  next();
});

export default mongoose.models.User || mongoose.model('usuarios', usuarioSchema);
