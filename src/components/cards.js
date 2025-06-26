//  Функции для работы с карточками проекта Mesto вынесите в файл card.js, 
//  из него должна экспортироваться функция createCard, которую вы создали раньше 
//  (у вас она может называться по-другому). Функции, обрабатывающие события лайка и удаления карточки,
//  также должны находиться в этом файле и экспортироваться из него.
export { createCard, deleteCard };

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const placesList = document.querySelector('.places__list');

// Функция создания карточки

  const createCard = (item, deleteCard) => {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likeButton = placesItem.querySelector('.card__like-button');
  placesItem.querySelector('.card__title').textContent = item.name;
  placesItem.querySelector('.card__image').src = item.link;
  placesItem.querySelector('.card__image').alt = `Фотография места: ${item.name}`;
  
  deleteButton.addEventListener('click', () => {
    deleteCard(placesItem);
  });

  return placesItem
};

// Функция удаления карточки

const deleteCard = (placesItem) => {
  placesItem.remove()
};

// Вывести карточки на страницу

initialCards.forEach( item => {
  const card = createCard(item, deleteCard);
  placesList.append(card);
});