// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

  // @todo: Функция создания карточки

const createCard = (item, deleteCard) => {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  
  placesItem.querySelector('.card__title').textContent = item.name;
  placesItem.querySelector('.card__image').src = item.link;
  placesItem.querySelector('.card__image').alt = `Фотография места: ${item.name}`;
  
  deleteButton.addEventListener('click', () => {
    deleteCard(placesItem);
  });

  return placesItem
};

  // @todo: Функция удаления карточки

const deleteCard = (placesItem) => {
  placesItem.remove()
};

  // @todo: Вывести карточки на страницу

initialCards.forEach( item => {
  const card = createCard(item, deleteCard);
  placesList.append(card);
});