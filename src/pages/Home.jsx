import { useEffect, useState } from "react";
import {
  getPokemonList,
  getPokemonByType,
  getPokemonTypes,
} from "../services/pokemon";
import PokemonModal from "../components/PokemonModal";
import Header from "../components/Header";

function Home() {

  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [offset, setOffset] = useState(0);
  const limit = 20;

  const [favorites, setFavorites] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (selectedType) {
      fetchByType();
    } else {
      fetchPokemon();
    }
  }, [offset, selectedType]);

  useEffect(() => {
    setOffset(0);
  }, [selectedType]);

  const fetchPokemon = async () => {
    const data = await getPokemonList(limit, offset);
    setPokemon(data);
  };

  const fetchByType = async () => {
    try {
      const data = await getPokemonByType(selectedType);

      if (!data || !data.pokemon) {
        setPokemon([]);
        return;
      }

      const results = data.pokemon.map((item) => item.pokemon);

      setPokemon(results.slice(offset, offset + limit));
    } catch (error) {
      setPokemon([]);
    }
  };


  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((fav) => fav !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    const data = await getPokemonTypes();
    console.log("Fetched Types:", data);
    setTypes(data);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 p-6">
  
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-center mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
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
          const id = poke.url.split("/")[6];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const isFav = favorites.includes(poke.name);

          return (
            <div
              key={poke.name}
              onClick={() => setSelectedPokemon(poke)}
              className="relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center"
            >

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(poke.name);
                }}
                className="absolute top-2 right-2 text-xl"
              >
                {isFav ? "❤️" : "🤍"}
              </button>

              <img
                src={image}
                alt={poke.name}
                className="mx-auto w-20 h-20"
              />

              <p className="capitalize mt-2 font-medium">
                {poke.name}
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