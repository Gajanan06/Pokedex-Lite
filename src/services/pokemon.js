const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemonList = async (limit = 20, offset=0) => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  return data.results;
};

export const getPokemonDetails = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getPokemonTypes = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  return data.results;
};

export const getPokemonByType = async (type) => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  return data;
};