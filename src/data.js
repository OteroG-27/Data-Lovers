// document.addEventListener('DOMContentLoaded', () => {
//   fetch('https://rickandmortyapi.com/api/character?page=3')
//     .then(response => response.json())
//     .then(data => displayCharacters(data.results))
//     .catch(error => console.error('Error fetching data:', error));
// });

// function displayCharacters(characters) {
//   const charactersDiv = document.getElementById('containerCharacters');

//   characters.forEach(character => {
//     const characterDiv = document.createElement('div');
//     characterDiv.innerHTML = `
//       <div class="character">
//         <div class="c-img">
//           <img src="${character.image}" alt="${character.name}">
//         </div>
//         <div class="c-info">
//           <p class="btnGO">Go</p>
//           <h3>Name:</h3>
//           <p class="descripcion">${character.name}</p>
//           <h3>Status:</h3>
//           <p class="descripcion">${character.status}</p>
//         </div>
//       </div>
//     `;
//     charactersDiv.appendChild(characterDiv);
//   });
// }
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => displayCharacters(data.results.slice(0, 4)))
    .catch(error => console.error('Error fetching data:', error));
});

function displayCharacters(characters) {
  const charactersDiv = document.getElementById('containerCharacters');
  let counter = 0;
  characters.forEach(character => {
    const characterDiv = document.createElement('div');
    characterDiv.className = 'character';
    characterDiv.innerHTML = `
      <div class="c-img">
        <img src="${character.image}" alt="${character.name}">
      </div>
      <div class="c-info">
        <button class="btnGO" id="btnGO" value="${character.id}">Go</button>
        <h3>Name:</h3>
        <p class="descripcion">${character.name}</p>
        <h3>Status:</h3>
        <p class="descripcion">${character.status}</p>
      </div>
    `;
    charactersDiv.appendChild(characterDiv);
    counter++;
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const verMenosBtn = document.getElementById('verMenosBtn');
    if (counter === 4) {
      learnMoreBtn.addEventListener('click', () => {
        fetch('https://rickandmortyapi.com/api/character')
          .then(response => response.json())
          .then(data => displayCharacters(data.results.slice(4)))
          .catch(error => console.error('Error fetching additional data:', error));
      });
    }else if (counter > 19){
      learnMoreBtn.remove();
      verMenosBtn.addEventListener('click', () => {
        fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => displayCharacters(data.results.slice(0, 4)))
        .catch(error => console.error('Error fetching additional data:', error));
      });
    }
      // Obtén todos los botones con la clase 'btnGo'
      var buttons = document.querySelectorAll('.btnGO');
      // Convierte la NodeList a un array para recorrerla
      var buttonsArray = Array.from(buttons);
      // Agrega un evento click a cada botón
      buttonsArray.forEach(function (button) {
        button.addEventListener('click', function () {
          // Obtén el ID del personaje desde el atributo value
          var characterId = button.value;
          // Guarda el ID del personaje en el localStorage
          localStorage.setItem('id', characterId);
          // Redirige a personaje-detalles.html
          window.location.href = 'personaje-detalles.html';
        });
      });
    });
}


