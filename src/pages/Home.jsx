import { useEffect, useState } from "react";
import { getPokemonList } from "../services/pokemon";

function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const data = await getPokemonList();
    setPokemon(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon List</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemon.map((poke) => {
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
    </div>
  );
}

export default Home;