import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: false },
  hashedToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

  
const PasswordResetToken = mongoose.models.PasswordResetToken || mongoose.model("PasswordResetToken", UserSchema); //research that

export default PasswordResetToken;