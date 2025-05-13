import mongoose from 'mongoose';

const VerificationToken = new mongoose.Schema({
  id: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, unique: true },
  token: { type: String, unique: true },
  
})

export default VerificationToken


