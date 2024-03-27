import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: "Not a valid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Too short password"],
  },
});

UserSchema.pre("save", function (next) {
  let salt = bcryptjs.genSaltSync(10);
  let hash = bcryptjs.hashSync(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.static("findByEmail", async function (email) {
  return await this.findOne({ email: email });
});
UserSchema.static("findByName", async function (name) {
  return await this.findOne({ name: name });
});

UserSchema.static("comparePassword", function (candidate, hash) {
  return bcryptjs.compareSync(candidate, hash);
});

const User = mongoose.model("user", UserSchema);

export default User;
