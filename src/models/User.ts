import mongoose, { Schema, models, model } from "mongoose"

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      match: /^09\d{8}$/,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    dob: {
      type: String, // yyyy-mm-dd
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
)

export const User =
  models.User || model("User", UserSchema)
