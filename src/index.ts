interface Pokemon {
  name: string;
}

async function getPokemon(): Promise<Pokemon[]> {
  const response = await fetch ("https://pokeapi.co/api/v2/pokemon/?limit=20/") // fetch data from pokeapi website
  const data = await response.json(); // convert the data to a json file
  if (!data || !data.results) {
    throw new Error("No data found") // Throw error if no data found
  }
  return data.results.map((pokemon: any) => ({
    name: pokemon.name,
  }));  // return the data in a map so we can load it to the page
}

function loadPokemon(pokemons: Pokemon[]): void {
  const pokedex = document.getElementById("pokedex");
  if(!pokedex) {
    return;
  }

  pokemons.forEach((pokemon) => {
    const pokemonElement = document.createElement("pokemonElement"); // create a new element for each pokemon
    pokemonElement.innerText = pokemon.name;
    pokemonElement.classList.add("pokemon"); // add a class to the element so they can be styled
    pokemonElement.innerHTML = `
      <div class="pokemon-name">${pokemon.name}</div>
    `;
    pokedex.appendChild(pokemonElement);
  });
}

async function main() {
  const pokemons = await getPokemon(); // fetch pokemon from api
  loadPokemon(pokemons); // load pokemon to the page
}

main();