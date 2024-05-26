import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  }
});

export default mongoose.models.User || mongoose.model('usuarios', usuarioSchema);
