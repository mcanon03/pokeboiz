const url = "https://pokeapi.co/api/v2";

export async function getAllPokemon() {
  const response = await fetch(`${url}/pokemon/`);
  return response.json();
}

export async function getAllPokemonTypes() {
  const response = await fetch(`${url}/type/`);
  return response.json();
}

export async function filterPokemonByType(type) {
  const response = await fetch(`${url}/type/${type}/`);
  return response.json();
}

export async function getPokemonGen() {
  const response = await fetch(`${url}/generation/`);
  return response.json();
}

export async function filterPokemonGen(gen) {
  const response = await fetch(`${url}/generation/${gen}/`);
  return response.json();
}
