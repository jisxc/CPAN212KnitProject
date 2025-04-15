const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {  
      type: String,
      required: [true, "Username is required"],  
      unique: true,
      lowercase: true, 
      trim: true,  
      match: [
        /^[a-zA-Z0-9_-]{3,20}$/,  
        "Please provide a valid username",  
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
