const url = 'https://pokeapi.co/api/v2';

export async function getAllPokemon() {
  const response = await fetch(`${url}/pokemon/`);
  return response.json();
}