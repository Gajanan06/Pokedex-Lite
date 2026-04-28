const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemonList = async () => {
  const res = await fetch(`${BASE_URL}?limit=20`);
  const data = await res.json();
  return data.results;
};