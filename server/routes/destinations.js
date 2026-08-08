import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

// GET /api/destinations
// GET /api/destinations?search=beach
// Returns all destinations, or a filtered list if a "search" query param is given.
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) {
      // $text uses the text index we defined in the schema (name, district, description, tags)
      filter.$text = { $search: search };
    }

    if (category) {
      filter.category = category;
    }

    const destinations = await Destination.find(filter).sort({ name: 1 });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch destinations", error: error.message });
  }
});

// GET /api/destinations/:id
// Returns a single destination by its MongoDB _id.
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch destination", error: error.message });
  }
});

export default router;
