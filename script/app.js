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
const search = document.getElementById('search');

const poke_container = document.getElementById('poke_container');

const searchPokemons = async searchText => {
	// Met de fetch API proberen we de data op te halen.
	const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
	.then(r=>r.json())
	.then(pokemon => pokemon.results)
	.catch((err)=>console.error("error: ", err));
	
	let matches = pokemon.filter(pokemon => {
		const exp = new RegExp(`^${searchText}`, 'gi');
		return pokemon.name.match(exp);
	});

	if (searchText.length > 0) {
		removePokemonCard();
		for (const match of matches) {
			var id = match.url;
			id = id.slice(34, -1);
			getPokemon(id);
		}
	}

	if (searchText.length === 0) {
		fetchPokemons();
	}
};

search.addEventListener('input', () => searchPokemons(search.value));

const fetchPokemons = async () => {
	removePokemonCard();
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
	console.table(pokemon);
	createPokemonCard(pokemon);
};

function removePokemonCard() {
	while (poke_container.firstChild) {
		poke_container.removeChild(poke_container.lastChild);
	}
}

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
		}
		if (secondType == color) {
			backgroundType2 = colors[color];
		}
	}

	const pokeInnerHTML = `
	<h2 class="pokemon-name">
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
					<h2 class="c-card__title">Types</h2>
						<div class="o-row">
							<div class="o-column">
							  <p class="c-type" style="background-color: ${backgroundType1};">${pokemon.types[0].type.name}</p>
							  </div>
							  <div class="o-column">
							  <p class="c-type" style="background-color: ${backgroundType2};">${secondType}</p>
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
						<h2 class="c-card__title">Stats</h2>
                        <label class="label" for="file">HP</label>
                        <progress class="c-progress" id="file" value="${pokemon.stats[0].base_stat}" max="100"></progress>
                        <label class="labelPercentage" for="file">${pokemon.stats[0].base_stat}</label>
                        <label class="label" for="file">Attack</label>
                        <progress class="c-progress" id="file" value="${pokemon.stats[1].base_stat}" max="100"></progress>
                        <label class="labelPercentage" for="file">${pokemon.stats[1].base_stat}</label>
                        <label class="label" for="file">Defense</label>
                        <progress class="c-progress" id="file" value="${pokemon.stats[2].base_stat}" max="100"></progress>
                        <label class="labelPercentage" for="file">${pokemon.stats[2].base_stat}</label>
                        <label class="label" for="file">Speed</label>
                        <progress class="c-progress" id="file" value="${pokemon.stats[3].base_stat}" max="100"></progress>
                        <label class="labelPercentage" for="file">${pokemon.stats[3].base_stat}</label>
                        <label class="label" for="file">Special Attack</label>
                        <progress class="c-progress" id="file" value="${pokemon.stats[4].base_stat}" max="100"></progress>
                        <label class="labelPercentage" for="file">${pokemon.stats[4].base_stat}</label>
                        <label class="label" for="file">Special Defense</label>
                        <progress class="c-progress" id="file" value="${pokemon.stats[5].base_stat}" max="100"></progress>
                        <label class="labelPercentage" for="file">${pokemon.stats[5].base_stat}</label>
					</div>
				</div>
			</div>
		</div>
		<div class="grid_profile"> 
			<div class="c-pokedex__item">
				<div class="c-card">
					<div class="c-card__body">
					<h2 class="c-card__title">Profile</h2>
						<div class="o-row">
							<div class="o-column">
							  <p>Height: ${(pokemon.height)/10} m</p>
							  </div>
							  <div class="o-column">
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
