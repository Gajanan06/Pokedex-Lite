import { useEffect, useState } from "react";
import { getPokemonList } from "../services/pokemon";

function Home() {
  const [pokemon, setPokemon] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const data = await getPokemonList();
    setPokemon(data);
  };

  const filteredPokemon = pokemon.filter((poke) =>
  poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          return (
            <div
              key={poke.name}
              className="bg-white p-3 rounded shadow text-center"
            >
              <img src={image} alt={poke.name} className="mx-auto" />
              <p className="capitalize">{poke.name}</p>
            </div>
          );
        })}
      </div>

      {filteredPokemon.length === 0 && (
        <p className="mt-4">No Pokémon found</p>
      )}
    </div>
  );
}

export default Home;