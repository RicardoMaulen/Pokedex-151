//? variable y constantes.
const listaPokemon = document.querySelector("#listaPokemon");
const btnsHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
  //? recuperando datos del tipo de pokemon.
  let tipos = poke.types.map(
    (type) => `
    <p class="${type.type.name} tipo">${type.type.name}</p>
  `
  );
  tipos = tipos.join("");

  //? agregando 0 Y 00 al id del pokemon.
  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  } else if (pokeId.length === 3) {
    pokeId = pokeId;
  }

  //? creacion de las card dinamicas
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `

      <p class="pokemon-id-back">#${pokeId}</p>

      <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
      </div>

      <div class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">#${pokeId}</p>
          <p class="pokemon-nombre">${poke.name}</p>
        </div>

        <div class="pokemon-tipos">
          ${tipos}
        </div>

        <div class="pokemon-stats">
          <p class="stat">1${poke.height}mts</p>
          <p class="stat">${poke.weight}kg</p>
        </div>

      </div>
  `;

  listaPokemon.append(div);
}

//? lista de botones por tipo
btnsHeader.forEach((boton) =>
  boton.addEventListener("click", (e) => {
    const botonId = e.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })

);

