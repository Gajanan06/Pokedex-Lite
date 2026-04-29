import { useEffect, useState } from "react";
import { getPokemonDetails } from "../services/pokemon";

function PokemonModal({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (pokemon) {
      fetchDetails();
    }
  }, [pokemon]);

  const fetchDetails = async () => {
    const data = await getPokemonDetails(pokemon.url);
    setDetails(data);
  };

  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg w-80 relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl"
        >
          ✖
        </button>

        {!details ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center capitalize">
              {details.name}
            </h2>

            <img
              src={details.sprites.front_default}
              alt={details.name}
              className="mx-auto"
            />

            <div className="mt-4">
              <h3 className="font-semibold">Stats:</h3>
              {details.stats.map((stat) => (
                <p key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Abilities:</h3>
              {details.abilities.map((ab) => (
                <p key={ab.ability.name}>
                  {ab.ability.name}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PokemonModal;