interface Pokemon {
  name: string;
}

async function getPokemon(): Promise<Pokemon[]> {
  const response = await fetch ("https://pokeapi.co/api/v2/pokemon/?limit=20/") // fetch data from pokeapi website
  const data = await response.json(); // convert the data to a json file
  if (!data || !data.results) {
    throw new Error("No data found")
  }
  return data.results.map((pokemon: any) => ({
    name: pokemon.name,
  }));
}

async function main() {
  const pokemons = await getPokemon();
  console.log(pokemons);
}

main();