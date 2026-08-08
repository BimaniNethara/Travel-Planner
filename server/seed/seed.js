// This script wipes the destinations collection and re-inserts 20 curated
// Sri Lankan destinations. Run it once after setting up MongoDB:
//
//   npm run seed
//
// (run from inside the /server folder, with your .env already set up)

import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "../models/Destination.js";

dotenv.config();

// Placeholder images (placehold.co) so the app runs out of the box with zero
// setup. Swap the "image" field for a real photo URL any time — nothing
// else in the app needs to change.
const img = (name, hex) => `https://placehold.co/600x400/${hex}/faf3e7?text=${encodeURIComponent(name)}`;

const destinations = [
  {
    name: "Sigiriya Rock Fortress",
    district: "Matale",
    category: "Cultural",
    description:
      "A 200-metre column of rock rising out of the jungle, topped with the ruins of a 5th-century royal palace.",
    interestingFact:
      "The frescoes on the rock face are 1,500 years old, and the mirror wall below them was once so polished you could see your reflection.",
    location: { lat: 7.957, lng: 80.7603 },
    image: img("Sigiriya", "8a5a2b"),
    tags: ["UNESCO", "hiking", "ancient", "sunrise"],
  },
  {
    name: "Kandy",
    district: "Kandy",
    category: "Cultural",
    description:
      "The last capital of the Sinhalese kings, wrapped around a peaceful lake and home to the Temple of the Sacred Tooth Relic.",
    interestingFact:
      "The temple holds what's believed to be Buddha's actual tooth relic, guarded so closely it's only shown to the public a few times a century.",
    location: { lat: 7.2906, lng: 80.6337 },
    image: img("Kandy", "0f4c43"),
    tags: ["UNESCO", "temple", "lake", "culture"],
  },
  {
    name: "Galle Fort",
    district: "Galle",
    category: "Cultural",
    description:
      "A walled coastal city built by the Portuguese and expanded by the Dutch, still lived in today with cafes and boutiques inside its ramparts.",
    interestingFact:
      "The fort's walls survived the 2004 tsunami almost untouched, while much of the coastline around it was devastated.",
    location: { lat: 6.0269, lng: 80.2167 },
    image: img("Galle Fort", "1b3a4b"),
    tags: ["UNESCO", "colonial", "coast", "walking"],
  },
  {
    name: "Ella",
    district: "Badulla",
    category: "Hill Country",
    description:
      "A small hill-country town surrounded by tea plantations, waterfalls, and one of the most photographed train rides in the world.",
    interestingFact:
      "The Nine Arch Bridge nearby was built during WWI without any steel, since the material was rationed for the war effort.",
    location: { lat: 6.8667, lng: 81.0466 },
    image: img("Ella", "3a6b35"),
    tags: ["tea", "train", "hiking", "views"],
  },
  {
    name: "Nuwara Eliya",
    district: "Nuwara Eliya",
    category: "Hill Country",
    description:
      "A misty highland town of Tudor-style cottages and manicured tea estates, nicknamed 'Little England' by the British.",
    interestingFact:
      "At over 1,800m elevation, it's cool enough that locals wear jackets year-round — a rarity anywhere in tropical Sri Lanka.",
    location: { lat: 6.9497, lng: 80.7891 },
    image: img("Nuwara Eliya", "2f5233"),
    tags: ["tea", "cool climate", "colonial"],
  },
  {
    name: "Mirissa",
    district: "Matara",
    category: "Beach",
    description:
      "A crescent-shaped beach on the south coast, popular for palm-fringed sunbathing and boat trips to see blue whales offshore.",
    interestingFact:
      "The waters off Mirissa are one of the few places on Earth where blue whales, the largest animals ever to exist, are seen almost year-round.",
    location: { lat: 5.9483, lng: 80.4589 },
    image: img("Mirissa", "0e6ba8"),
    tags: ["beach", "whale watching", "surfing"],
  },
  {
    name: "Yala National Park",
    district: "Hambantota",
    category: "Wildlife",
    description:
      "Sri Lanka's most visited national park, a mix of scrubland, lagoons, and ruins with one of the densest leopard populations on Earth.",
    interestingFact:
      "Yala is estimated to have the highest density of leopards of any protected area in the world.",
    location: { lat: 6.3728, lng: 81.5165 },
    image: img("Yala", "7a5230"),
    tags: ["safari", "leopards", "elephants"],
  },
  {
    name: "Anuradhapura",
    district: "Anuradhapura",
    category: "Cultural",
    description:
      "The first ancient capital of Sri Lanka, with enormous dagobas (stupas) and monastery ruins dating back over 2,000 years.",
    interestingFact:
      "The sacred Jaya Sri Maha Bodhi tree here was grown from a cutting of the original tree Buddha is said to have sat under, and is the oldest documented tree in the world planted by a named person.",
    location: { lat: 8.3114, lng: 80.4037 },
    image: img("Anuradhapura", "8a5a2b"),
    tags: ["UNESCO", "ancient", "temple", "bicycle"],
  },
  {
    name: "Polonnaruwa",
    district: "Polonnaruwa",
    category: "Cultural",
    description:
      "Sri Lanka's medieval capital, with remarkably well-preserved stone palaces, temples, and Buddha statues set among lakes and parkland.",
    interestingFact:
      "The Gal Vihara's four Buddha statues were carved from a single slab of granite, without any joins.",
    location: { lat: 7.9403, lng: 81.0188 },
    image: img("Polonnaruwa", "6b4a2b"),
    tags: ["UNESCO", "ancient", "bicycle", "ruins"],
  },
  {
    name: "Dambulla Cave Temple",
    district: "Matale",
    category: "Cultural",
    description:
      "A complex of five caves carved into a granite outcrop, covered wall-to-ceiling in Buddhist murals and statues going back over 2,000 years.",
    interestingFact:
      "The cave complex houses more than 150 Buddha statues, including a 14-metre reclining Buddha carved directly out of the rock.",
    location: { lat: 7.8567, lng: 80.6491 },
    image: img("Dambulla", "b8860b"),
    tags: ["UNESCO", "temple", "murals"],
  },
  {
    name: "Trincomalee",
    district: "Trincomalee",
    category: "Beach",
    description:
      "A natural deep-water harbour city on the east coast, with quiet white-sand beaches and some of the island's best diving.",
    interestingFact:
      "Trincomalee's harbour is one of the largest natural harbours in the world, prized by colonial navies for centuries.",
    location: { lat: 8.5874, lng: 81.2152 },
    image: img("Trincomalee", "0e6ba8"),
    tags: ["beach", "diving", "harbour"],
  },
  {
    name: "Arugam Bay",
    district: "Ampara",
    category: "Beach",
    description:
      "A laid-back east-coast surf town, considered one of the best right-hand point breaks in the world.",
    interestingFact:
      "Arugam Bay regularly ranks among the world's top surf spots, drawing surfers from across the globe during its April–October season.",
    location: { lat: 6.84, lng: 81.8358 },
    image: img("Arugam Bay", "0e6ba8"),
    tags: ["surfing", "beach", "laid-back"],
  },
  {
    name: "Bentota",
    district: "Galle",
    category: "Beach",
    description:
      "A resort town on the southwest coast where a river meets the sea, known for watersports and mangrove boat safaris.",
    interestingFact:
      "The Bentota River safari winds through mangroves said to be home to over 60 species of birds.",
    location: { lat: 6.426, lng: 79.9958 },
    image: img("Bentota", "0e6ba8"),
    tags: ["beach", "watersports", "river"],
  },
  {
    name: "Hikkaduwa",
    district: "Galle",
    category: "Beach",
    description:
      "A lively beach town with a protected coral reef right off the shore, popular for snorkelling, diving, and surfing.",
    interestingFact:
      "Hikkaduwa's coral reef was one of Sri Lanka's first marine protected areas, designated back in 1979.",
    location: { lat: 6.1408, lng: 80.1017 },
    image: img("Hikkaduwa", "0e6ba8"),
    tags: ["beach", "coral reef", "snorkelling", "surfing"],
  },
  {
    name: "Adam's Peak (Sri Pada)",
    district: "Ratnapura",
    category: "Adventure",
    description:
      "A sacred 2,243m mountain climbed overnight by thousands of pilgrims and hikers to watch the sunrise from its summit.",
    interestingFact:
      "A rock formation at the summit is venerated by four religions — Buddhists, Hindus, Muslims, and Christians each attribute the footprint-shaped mark to a different figure.",
    location: { lat: 6.8096, lng: 80.4994 },
    image: img("Adam's Peak", "2f5233"),
    tags: ["hiking", "pilgrimage", "sunrise"],
  },
  {
    name: "Horton Plains & World's End",
    district: "Nuwara Eliya",
    category: "Nature",
    description:
      "A highland plateau of grassland and cloud forest that ends abruptly at 'World's End' — a sheer 870m cliff drop.",
    interestingFact:
      "On a clear morning from World's End you can reportedly see all the way to the south coast, nearly 80km away.",
    location: { lat: 6.8021, lng: 80.7972 },
    image: img("Worlds End", "3a6b35"),
    tags: ["hiking", "nature", "cliff", "cloud forest"],
  },
  {
    name: "Jaffna",
    district: "Jaffna",
    category: "Cultural",
    description:
      "The cultural heart of Sri Lankan Tamil life in the north, with its own distinct cuisine, temples, and a centuries-old fort.",
    interestingFact:
      "Jaffna's Nallur Kandaswamy Kovil hosts a 25-day annual festival, one of the longest and most elaborate Hindu temple festivals on the island.",
    location: { lat: 9.6615, lng: 80.0255 },
    image: img("Jaffna", "8a2b2b"),
    tags: ["culture", "temple", "cuisine"],
  },
  {
    name: "Negombo",
    district: "Gampaha",
    category: "Beach",
    description:
      "A relaxed beach and fishing town minutes from the international airport, threaded with Dutch-era canals.",
    interestingFact:
      "Negombo's fish market is one of the largest in the country, with outrigger fishing boats still built and launched much as they were generations ago.",
    location: { lat: 7.2094, lng: 79.838 },
    image: img("Negombo", "0e6ba8"),
    tags: ["beach", "fishing", "canals"],
  },
  {
    name: "Colombo",
    district: "Colombo",
    category: "Cultural",
    description:
      "Sri Lanka's commercial capital, a mix of colonial architecture, temples, markets, and a fast-modernising skyline along the coast.",
    interestingFact:
      "Galle Face Green, a long oceanfront lawn in the city centre, has been a public promenade since 1859.",
    location: { lat: 6.9271, lng: 79.8612 },
    image: img("Colombo", "1b3a4b"),
    tags: ["city", "shopping", "food"],
  },
  {
    name: "Pinnawala Elephant Orphanage",
    district: "Kegalle",
    category: "Wildlife",
    description:
      "A sanctuary founded to care for orphaned and injured wild elephants, now home to one of the largest captive elephant herds in the world.",
    interestingFact:
      "Visitors can watch the entire herd bathe together in the Ma Oya river, a daily ritual that draws crowds every afternoon.",
    location: { lat: 7.2975, lng: 80.3897 },
    image: img("Pinnawala", "6b4a2b"),
    tags: ["elephants", "wildlife", "family-friendly"],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Destination.deleteMany({});
    console.log("Cleared existing destinations.");

    await Destination.insertMany(destinations);
    console.log(`Inserted ${destinations.length} destinations.`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
