import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

  
const User = mongoose.models.User || mongoose.model("User", UserSchema); //research that

export default User;