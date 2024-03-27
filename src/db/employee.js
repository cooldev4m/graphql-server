import mongoose from "mongoose";

const EmplyeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required."],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required."],
  },
  emailID: {
    type: String,
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: "Not a valid email address.",
    },
    required: [true, "Email is required."],
    unique: true,
  },
});

let Employee = mongoose.model("employee", EmplyeeSchema);

export default Employee;
