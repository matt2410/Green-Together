import { Schema, model, models } from "mongoose"

export interface CommunityContribution {
  name?: string
  type: "location" | "comment" | "share" | "review"
  location?: string
  rating?: number
  content: string
  createdAt: Date
}

const CommunityContributionSchema = new Schema<CommunityContribution>(
  {
    name: {
      type: String,
      trim: true
    },

    type: {
      type: String,
      enum: ["location", "comment", "share", "review"],
      required: true
    },

    location: {
      type: String,
      trim: true
    },

    rating: {
      type: Number,
      min: 1,
      max: 5
    },

    content: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

export const CommunityContributionModel =
  models.CommunityContribution ||
  model("CommunityContribution", CommunityContributionSchema)
