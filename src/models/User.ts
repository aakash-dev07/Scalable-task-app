import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// अगर मॉडल पहले से बना है तो उसे इस्तेमाल करें, नहीं तो नया बनाएँ
const User = models.User || model("User", UserSchema);
export default User;