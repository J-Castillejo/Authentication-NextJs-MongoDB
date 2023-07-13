import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email is not valid"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
    minlength: 3,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
