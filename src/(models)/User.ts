import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: false }, //update later
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
})

  
const User = mongoose.models.User || mongoose.model("User", UserSchema); //research that

export default User;