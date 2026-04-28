const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemonList = async (limit = 20, offset=0) => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  return data.results;
};