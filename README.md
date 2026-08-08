# Travel Partner 🌴

A MERN-stack website for discovering 20 major travel destinations in Sri Lanka —
searchable, filterable by category, and shown on an interactive map.

**M**ongoDB (database) → **E**xpress (server/API) → **R**eact (frontend) → **N**ode (runtime)

## Project structure

```
travel-partner/
├── server/              Express + MongoDB API
│   ├── config/db.js         connects to MongoDB
│   ├── models/Destination.js  the shape of a "destination" document
│   ├── routes/destinations.js  API endpoints
│   ├── seed/seed.js         fills the DB with 20 destinations
│   └── server.js            starts the Express app
└── client/              React (Vite) frontend
    └── src/
        ├── api/destinations.js   talks to the backend
        ├── components/           Hero, SearchBar, Cards, Map, Footer
        └── App.jsx                wires it all together
```

## 1. Prerequisites

- Node.js 18+ installed
- A MongoDB database — either:
  - **Local**: install MongoDB Community Server and run it (`mongod`), or
  - **Atlas (easiest for beginners)**: make a free cluster at mongodb.com/atlas, whitelist your IP,
    and copy the connection string it gives you.

## 2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and paste your MongoDB connection string into `MONGO_URI`. If you're running MongoDB
locally with defaults, you don't need to change anything.

Seed the database with the 20 destinations (run this once):

```bash
npm run seed
```

You should see `Inserted 20 destinations.` Now start the API:

```bash
npm run dev
```

It runs at `http://localhost:5000`. Visit `http://localhost:5000/api/destinations` in your
browser — you should see a JSON list of all 20 places.

## 3. Set up the client

Open a **second terminal** (leave the server running in the first one):

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see the full site:
hero, search bar, category filters, destination cards, and the map.

## 4. How it fits together (the MERN request cycle)

1. You type in the **search bar** → React state (`searchTerm`) updates in `App.jsx`.
2. A `useEffect` in `App.jsx` notices the state changed, and calls `getDestinations()`
   from `api/destinations.js`.
3. That function sends an HTTP request (via axios) to the **Express** server:
   `GET /api/destinations?search=beach`.
4. Express's route handler (`routes/destinations.js`) receives it, and asks **Mongoose**
   (the library that talks to MongoDB) to find matching documents using the model defined
   in `models/Destination.js`.
5. **MongoDB** returns matching documents → Mongoose → Express sends them back as JSON.
6. React receives the JSON, stores it in state, and re-renders the destination cards and map pins.

That loop — UI event → API call → Express route → MongoDB query → JSON response → React
re-render — is the core pattern behind almost everything you'll build in MERN.

## 5. Where to go next

- Swap the placeholder images (`placehold.co` URLs in `seed/seed.js`) for real photos.
- Add a destination detail page (`/destinations/:id`) using React Router.
- Add authentication so users can save favourites (you opted to skip this for now).
- Deploy: client → Vercel/Netlify, server → Render/Railway, database → MongoDB Atlas.
