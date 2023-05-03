const addCardButtons = document.querySelectorAll('.add-card-button');
//add a card
addCardButtons.forEach(button => {
  button.addEventListener('click', () => {
    const cardText = prompt('Enter card text:');
    if (cardText) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = cardText;
      const cardContainer = button.closest('.list');
      cardContainer.insertBefore(card, button);
    }
  });
});

//move the cards
const lists = document.querySelectorAll('.list');
let draggedCard = null;

// Add event listeners to each card
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    draggedCard = card;
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    draggedCard.classList.remove('dragging');
    draggedCard = null;
  });
});

// Add event listeners to each list
lists.forEach(list => {
  list.addEventListener('dragover', event => {
    event.preventDefault();
    const afterElement = getDragAfterElement(list, event.clientY);
    const cardBeingDragged = document.querySelector('.card.dragging');
    if (afterElement == null) {
      list.appendChild(cardBeingDragged);
    } else {
      list.insertBefore(cardBeingDragged, afterElement);
    }
  });

  list.addEventListener('drop', event => {
    event.preventDefault();
    const cardBeingDragged = document.querySelector('.card.dragging');
    list.appendChild(cardBeingDragged);
  });
});

// Helper function to get the element where the card should be dropped
function getDragAfterElement(list, y) {
  const cards = Array.from(list.querySelectorAll('.card:not(.dragging)'));
  return cards.reduce((closest, card) => {
    const box = card.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: card };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
