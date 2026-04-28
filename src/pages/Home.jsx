import { useEffect, useState } from "react";
import { getPokemonList } from "../services/pokemon";
import PokemonModal from "../components/PokemonModal";

function Home() {
  const [pokemon, setPokemon] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [offset, setOffset] = useState(0);
  const limit = 20;

  const [favorites, setFavorites] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  const fetchPokemon = async () => {
    const data = await getPokemonList(limit, offset);
    setPokemon(data);
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon List</h1>

      <div className="mb-4">
       <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 border rounded"
       />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPokemon.map((poke) => {
          const id = poke.url.split("/")[6];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          const isFav = favorites.includes(poke.name);

          return (
           <div
  key={poke.name}
  onClick={() => setSelectedPokemon(poke)}
  className="relative bg-white p-3 rounded shadow text-center"
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
  <img src={image} alt={poke.name} className="mx-auto" />
  <p className="capitalize">{poke.name}</p>
</div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <p className="text-center mt-4">
  Page: {offset / limit + 1}
</p>
  <button
    onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
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

      {filteredPokemon.length === 0 && (
        <p className="mt-4">No Pokémon found</p>
      )}

      {selectedPokemon && (
  <PokemonModal
    pokemon={selectedPokemon}
    onClose={() => setSelectedPokemon(null)}
  />
)}

    </div>
  );
}

export default Home;