interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
  type: string;
}

async function getPokemon(): Promise<Pokemon[]> {
  const response = await fetch ("https://pokeapi.co/api/v2/pokemon/?limit=1025/") // fetch data from pokeapi website
  const data = await response.json(); // convert the data to a json file
  if (!data || !data.results) {
    throw new Error("No data found") // Throw error if no data found
  }
  return data.results.map((pokemon: any, index: number) => ({
    name: pokemon.name,
    id: index + 1,
  }));  // return the data in a map so we can load it to the page
}

function loadPokemon(pokemons: Pokemon[]): void {
  const pokedex = document.getElementById("pokedex");
  if(!pokedex) {
    return;
  }

  pokedex.innerHTML = ""; // clear the pokedex before loading new pokemon

  pokemons.forEach((pokemon) => {
    const pokemonElement = document.createElement("pokemonElement"); // create a new element for each pokemon
    pokemonElement.innerText = pokemon.name;
    pokemonElement.classList.add("pokemon"); // add a class to the element so they can be styled
    pokemonElement.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" class="pokemon-sprite" alt="${pokemon.name}" />
      <div class="pokemon-name">${pokemon.name}</div>
      <div class="pokemon-id">#${pokemon.id}</div>
    `;
    pokedex.appendChild(pokemonElement);
  });
}

async function main() {
  const pokemons = await getPokemon(); // fetch pokemon from api
  loadPokemon(pokemons); // load pokemon to the page

  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    searchInput.addEventListener('input', () => {
        const filteredPokemon = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        loadPokemon(filteredPokemon);
    });
}

main();