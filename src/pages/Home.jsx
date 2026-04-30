import { useEffect, useState } from "react";
import {getPokemonList, getPokemonByType, getPokemonTypes,} from "../services/pokemon";
import PokemonModal from "../components/PokemonModal";
import Header from "../components/Header";

function Home() {

  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [offset, setOffset] = useState(0);
  const limit = 20;

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");



  const fetchPokemon = async () => {
    const data = await getPokemonList(limit, offset);
    setPokemon(data);
  };

    useEffect(() => {
    fetchTypes();
  }, []);


 const filteredPokemon = pokemon.filter((poke) => {
  return poke.name.toLowerCase().includes(searchTerm.toLowerCase());
});


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


  const fetchTypes = async () => {
    const data = await getPokemonTypes();
    setTypes(data);
  };



    useEffect(() => {
    if (selectedType) {
      fetchByType();
    } else {
      fetchPokemon();
    }
  }, [offset, selectedType]);

   const fetchByType = async () => {
    try {
      const data = await getPokemonByType(selectedType);

      const results = data.pokemon.map((item) => item.pokemon);

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
    <div className="min-h-screen bg-gray-500 p-6">
  
      <div className="flex gap-4 justify-center align-items-center mb-6">
      <div className="flex justify-center w-70 h-11">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full max-w-md px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="flex justify-center align-items-center h-11">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full max-w-sm px-5 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {filteredPokemon.map((poke) => {
          const url = poke.url;
          const name = poke.name;
          const id = url?.split("/")[6];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const isFav = favorites.includes(name);

          return (
            <div
              key={name}
              onClick={() => setSelectedPokemon(poke)}
              className="relative bg-white p-4 rounded-xl shadow text-center cursor-pointer transform transition duration-300 ease-in-out hover:scale-105"
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

              <img src={image} alt={name} className="mx-auto w-30 h-30 transition-transform duration-300 hover:scale-110"
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