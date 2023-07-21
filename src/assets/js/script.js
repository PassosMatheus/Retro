const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');

const characters = [
  'homem_de_ferro',
  'capitao_america',
  'homem_aranha',
  'wanda',
  'natasha',
  'gamora',
  'rocket',
  'thanos',
  'hulk',
  'capita_marvel',
  'dr_estranho',
  'pantera_negra'
];

const retro = [
  'Kudo Card',
  'Ponto Positivo',
  'Ponto Negativo',
  'Oportunidade de melhoria',
  'Conte uma piada ou uma situação engraçada',
  'Última coisa que aprendeu no PDI',
  'Tecnologia que gostaria de aprender',
  'Tecnologia que gosta de trabalhar'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';


const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

      sorteio = retro[Math.floor(Math.random()* retro.length)];
      alert(sorteio);

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('assets/imagens/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

window.onload = () => {
  loadGame();
}
