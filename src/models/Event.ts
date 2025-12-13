import mongoose, { Schema, models, model } from "mongoose"

const EventSchema = new Schema(
  {
    id: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    images: [{ type: String }],
    startDate: { type: Date, index: true },
    endDate: { type: Date }
  },
  {
    collection: "events",
    timestamps: true
  }
)

// tránh overwrite model khi hot reload
export const EventModel =
  models.Event || model("Event", EventSchema)
