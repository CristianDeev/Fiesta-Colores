const title = document.getElementById('title');
const danceFloor = document.getElementById('dance-floor');
const addColorBtn = document.getElementById('add-color');
const resetBtn = document.getElementById('reset');
const popularColor = document.getElementById('popular-color');
const timerDisplay = document.getElementById('timer');

let colorVotes = {};
let timer;
let timeLeft = 10;

const colorPalette = [
    'red',       
    'blue',      
    'green',    
    'yellow',    
    'orange',   
    'purple',   
    'pink',      
    'brown',     
    'black',     
    'white'      
  ];
  

function changeTitleColor(color) {
  title.style.color = color;

  colorVotes[color] = (colorVotes[color] || 0) + 1;

  const mostPopular = Object.keys(colorVotes).reduce((a, b) => 
    colorVotes[a] > colorVotes[b] ? a : b
  );
  popularColor.innerText = `Color más popular: ${mostPopular}`;

  resetInactivityTimer();
}

addColorBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  const newColor = colorPalette[randomIndex];

  const colorButton = document.createElement('button');
  colorButton.className = 'color';
  colorButton.style.backgroundColor = newColor;

  colorButton.addEventListener('click', () => changeTitleColor(newColor));
  danceFloor.appendChild(colorButton);

  resetInactivityTimer();
});

resetBtn.addEventListener('click', resetParty);

function resetParty() {
  danceFloor.innerHTML = '';
  colorVotes = {};
  popularColor.innerText = 'Color más popular: Ninguno';
  title.style.color = 'white';
  resetInactivityTimer();
}

function resetInactivityTimer() {
  clearInterval(timer);

  timeLeft = 10;
  timerDisplay.innerText = `Tiempo restante: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft -= 1;
    timerDisplay.innerText = `Tiempo restante: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('La fiesta se ha reiniciado por inactividad.');
      resetParty();
    }
  }, 1000);
}

document.querySelectorAll('.color').forEach((btn) => {
  btn.addEventListener('click', () => changeTitleColor(btn.style.backgroundColor));
});

resetInactivityTimer();
