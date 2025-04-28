import bcrypt from "bcryptjs"
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});



UserSchema.methods.comparePassword = function comparePassword(
    candidatePassword: string,
    cb: (err: any, isMatch: boolean) => void //cb is a function that gets an error (if any) and a true/false for password match.
  ) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch ?? false); //this ullish coalescing operator ensures that if isMatch is undefined, we default isMatch to false
    });
  };
  
  export default mongoose.model("User", UserSchema);