const poke_container = document.getElementById('poke_container');
const pokemons_number = 151;
var backgroundType1;
var backgroundType2;
var firstType = "";
var secondType = "";
const colors = {
	normal: '#BDBDAE',
	poison: '#A15999',
	psychic: '#FA65B6',
	grass: '#8BD650',
	ground: '#ECCC57',
	ice: '#96F1FF',
	fire: '#FA5543',
	rock: '#CEBD72',
	dragon: '#8874FF',
	water: '#56AEFF',
	bug: '#C2D21F',
	dark: '#886653',
	fighting: '#A75545',
	ghost: '#7975D7',
	steel: '#C4C2DB',
	flying: '#79A4FF',
	electric: '#FDE53C',
	fairy: '#F9ADFF',
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
	// Met de fetch API proberen we de data op te halen.
	const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(r=>r.json())
		.catch((err)=>console.error("error: ", err));
		
	// Als dat gelukt is, gaan we naar onze showResult functie.
	// console.log(pokemon);
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

	firstType = pokemon.types[0].type.name;
	
	if (pokemon.types.length > 1){
		secondType = pokemon.types[1].type.name;
	}

	for (const color in colors){
		if (firstType == color) {
			backgroundType1 = colors[color];
			console.log(backgroundType1);
		}
		if (secondType == color) {
			backgroundType2 = colors[color];
			console.log(backgroundType2);
		}
	}

	const pokeInnerHTML = `
	<h2 class="pokemon">
		#${pokemon.id.toString().padStart(3, '0')} ${name}
	</h2>	
	<div class="c-pokedex">
		<div class="grid_photo"> 
			<div class="c-pokedex__item" style="background-color: ${backgroundType1}">
				<div class="c-card">
					<div class="c-card__body">
						<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
					</div>                     
				</div>
			</div>
		</div>
		<div class="grid_type"> 
			<div class="c-pokedex__item">
				<div class="c-card">
					<div class="c-card__body">
						<h3>Types</h3>
						<div class="row">
							<div class="column">
							  <p class="type" style="background-color: ${backgroundType1};">${pokemon.types[0].type.name}</p>
							  </div>
							  <div class="column">
							  <p class="type" style="background-color: ${backgroundType2};">${secondType}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="grid_stats"> 
			<div class="c-pokedex__item">
				<div class="c-card">
					<div class="c-card__body">
						<h3>Stats</h3>
                        <label class="label" for="file">HP</label>
                        <progress id="file" value="${pokemon.stats[0].base_stat}" max="100"></progress>
                        <label class="label" for="file">Attack</label>
                        <progress id="file" value="${pokemon.stats[1].base_stat}" max="100"></progress>
                        <label class="label" for="file">Defense</label>
                        <progress id="file" value="${pokemon.stats[2].base_stat}" max="100"></progress>
                        <label class="label" for="file">Speed</label>
                        <progress id="file" value="${pokemon.stats[3].base_stat}" max="100"></progress>
                        <label class="label" for="file">Special Attack</label>
                        <progress id="file" value="${pokemon.stats[4].base_stat}" max="100"></progress>
                        <label class="label" for="file">Special Defense</label>
                        <progress id="file" value="${pokemon.stats[5].base_stat}" max="100"></progress>
					</div>
				</div>
			</div>
		</div>
		<div class="grid_profile"> 
			<div class="c-pokedex__item">
				<div class="c-card">
					<div class="c-card__body">
						<h3>Profile</h3>
						<div class="row">
							<div class="column">
							  <p>Height: ${(pokemon.height)/10} m</p>
							  </div>
							  <div class="column">
							  <p>Weight: ${(pokemon.weight)/10} kg</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
	secondType = "";
}

document.addEventListener('DOMContentLoaded', function() {
	fetchPokemons();
});
