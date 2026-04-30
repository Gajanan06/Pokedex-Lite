import { useEffect, useState } from "react";
import {
  getPokemonList,
  getPokemonByType,
  getPokemonTypes,
} from "../services/pokemon";
import PokemonModal from "../components/PokemonModal";
import Header from "../components/Header";
import { useRef } from "react";

function Home() {

  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [offset, setOffset] = useState(0);
  const limit = 20;

  const [favorites, setFavorites] = useState(() => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
});
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const isFirstLoad = useRef(true);



  const fetchPokemon = async () => {
    const data = await getPokemonList(limit, offset);
    setPokemon(data);
  };

 


 const filteredPokemon = (pokemon || []).filter((poke) => {
  const name = poke?.name || poke?.pokemon?.name || "";
  return name.toLowerCase().includes(searchTerm.toLowerCase());
});


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    // console.log("Loaded favorites:", saved);
    setFavorites(saved);
  }, []);

  useEffect(() => {
  if (isFirstLoad.current) {
    isFirstLoad.current = false;
    return;
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

  const toggleFavorite = (name) => {
  const normalized = name.toLowerCase();

  setFavorites((prev) => {
    let updated;

    if (prev.includes(normalized)) {
      updated = prev.filter((fav) => fav !== normalized);
    } else {
      updated = [...prev, normalized];
    }

    // ✅ Save immediately (no useEffect needed)
    localStorage.setItem("favorites", JSON.stringify(updated));

    return updated;
  });
};


  const fetchTypes = async () => {
    const data = await getPokemonTypes();
    // console.log("Fetched Types:", data);
    setTypes(data);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

    useEffect(() => {
    if (selectedType) {
      fetchByType();
    } else {
      fetchPokemon();
    }
  }, [offset, selectedType]);

   const fetchByType = async () => {
    try {
      const res = await getPokemonByType(selectedType);

      const results = res.pokemon.map((item) => item.pokemon);

      setPokemon(results.slice(offset, offset + limit));
    } catch (error) {
      setPokemon([]);
    }
  };

    useEffect(() => {
    setOffset(0);
  }, [selectedType]);

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-500 via-gray-200 to-gray-300 p-6">
  
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full max-w-md px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="flex justify-center mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {filteredPokemon.map((poke) => {
          const url = poke.url || poke?.pokemon?.url;
          const name = poke.name || poke?.pokemon?.name;
          const id = url?.split("/")[6];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const normalizedName = name.toLowerCase();
          const isFav = favorites.includes(normalizedName);
          

          return (
            <div
              key={name}
              onClick={() => setSelectedPokemon(poke)}
              className="relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center"
            >

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(name);
                }}
                className="absolute top-2 right-2 text-xl"
              >
                {isFav ? "❤️" : "🤍"}
              </button>

              <img
  src={image}
  alt={name}
  className="mx-auto w-20 h-20 transition-transform duration-300 hover:scale-110"
/>

              <p className="capitalize mt-2 font-medium">
                {name}
              </p>
            </div>
          );
        })}
      </div>

      {!selectedType && (
        <div className="flex flex-col items-center mt-6 gap-3">
          <p>Page: {offset / limit + 1}</p>

          <div className="flex gap-4">
            <button
              onClick={() =>
                setOffset((prev) => Math.max(prev - limit, 0))
              }
              disabled={offset === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => setOffset((prev) => prev + limit)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {filteredPokemon.length === 0 && (
        <p className="text-center mt-6 text-gray-600">
          No Pokémon found
        </p>
      )}


      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
    </>
  );
}

export default Home;