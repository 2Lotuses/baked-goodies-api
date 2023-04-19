import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  { collection: "admin" }
);

const Admin = mongoose.model("admin", newSchema);

export default Admin;
