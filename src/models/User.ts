import { Schema, models, model } from "mongoose"

const UserSchema = new Schema(
  {
    /* ===== THÔNG TIN CƠ BẢN ===== */
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
    image: String,

    phone: {
      type: String,
      match: /^09\d{8}$/,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dob: {
      type: String, // yyyy-mm-dd
    },

    /* ===== GHI NHẬN & ĐÓNG GÓP ===== */
    totalPoints: {
      type: Number,
      default: 0,
      index: true,
    },

    totalActivities: {
      type: Number,
      default: 0,
    },

    badges: {
      type: [String],
      default: [],
    },

    level: {
      type: String,
      enum: ["newbie", "active", "champion"],
      default: "newbie",
    },

    lastActiveAt: Date,

    joinedEvents: {
      type: [Schema.Types.ObjectId],
      ref: "Event",
      default: [],
    },
  },
{
  timestamps: true,
    collection: "users",
  }
)

export const User =
  models.User || model("User", UserSchema)
