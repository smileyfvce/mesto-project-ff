export { initialCards , placesList, createCard, deleteCard, likedCard };

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
  },
];

// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы

const placesList = document.querySelector(".places__list");

// Функция создания карточки

const createCard = (item, deleteCard, likedCard, openImage) => {
  const placesItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  const cardTitle = placesItem.querySelector(".card__title");
  const deleteButton = placesItem.querySelector(".card__delete-button");
  const likeButton = placesItem.querySelector(".card__like-button");
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = `Фотография места: ${item.name}`;

  // слушатель корзины

  deleteButton.addEventListener("click", () => {
    deleteCard(placesItem);
  });

  // слушатель картинки

  cardImage.addEventListener("click", () => openImage(cardTitle.textContent, cardImage.src));

  // слушатель лайка

  likeButton.addEventListener("click", likedCard);

  return placesItem;
};

// Функция удаления карточки

const deleteCard = (placesItem) => {
  placesItem.remove();
};

// Функция лайка

function likedCard(card) {
  if (card.target.classList.contains("card__like-button")) {
    card.target.classList.toggle("card__like-button_is-active");
  }
}