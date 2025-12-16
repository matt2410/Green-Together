import mongoose, { Schema, models, model } from "mongoose"

const EventJoinSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    eventId: {
      type: String,
      required: true,
      index: true,
    },
    points: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true, collection: "event_joins" }
)

EventJoinSchema.index({ userId: 1, eventId: 1 }, { unique: true })

export const EventJoinModel =
  models.EventJoin || model("EventJoin", EventJoinSchema)
