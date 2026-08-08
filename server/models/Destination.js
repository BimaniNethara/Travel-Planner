import mongoose from "mongoose";

// This schema defines the "shape" every destination document in MongoDB must follow.
// Mongoose validates data against this shape before it's saved.
const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String, // e.g. "Kandy", "Galle" — the Sri Lankan district it's in
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Cultural", "Beach", "Hill Country", "Wildlife", "Adventure", "Nature"],
    },
    description: {
      type: String,
      required: true,
    },
    interestingFact: {
      type: String, // the "why it's interesting" hook shown on the card
      required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    image: {
      type: String, // URL to an image
      required: true,
    },
    tags: {
      type: [String], // e.g. ["UNESCO", "hiking", "sunrise"] — used for search
      default: [],
    },
  },
  { timestamps: true }
);

// A simple text index so we can search name, district, description and tags efficiently.
destinationSchema.index({
  name: "text",
  district: "text",
  description: "text",
  tags: "text",
});

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
