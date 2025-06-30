import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: false }, //update later
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  verification_token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

  
const PendingUser = mongoose.models.PendingUser || mongoose.model("PendingUser", UserSchema); //research that

export default PendingUser;