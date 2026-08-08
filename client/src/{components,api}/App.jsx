import { useEffect, useState } from "react";
import { getDestinations } from "./api/destinations.js";
import Hero from "./components/Hero.jsx";
import DestinationGrid from "./components/DestinationGrid.jsx";
import MapView from "./components/MapView.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  // Refetch whenever the search term or category changes. The search term
  // is debounced by 350ms so we're not firing a network request on every
  // single keystroke.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(true);
      setError("");

      getDestinations({ search: searchTerm, category })
        .then((data) => setDestinations(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, category]);

  const handleSelect = (destination) => {
    setSelected(destination);
  };

  return (
    <div className="app">
      <Hero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        resultCount={destinations.length}
      />

      <main className="content">
        <section className="grid-section">
          <DestinationGrid
            destinations={destinations}
            loading={loading}
            error={error}
            onSelect={handleSelect}
            selectedId={selected?._id}
          />
        </section>

        <aside className="map-section">
          <div className="map-sticky">
            <h2>On the map</h2>
            <p className="map-hint">Click a card or a pin to jump to it.</p>
            <MapView destinations={destinations} selected={selected} onSelect={handleSelect} />
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
