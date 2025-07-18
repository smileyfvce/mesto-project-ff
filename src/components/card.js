export { createCard, deleteCard, likedCard };

// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

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
  cardImage.addEventListener("click", () =>
    openImage(cardTitle.textContent, cardImage.src)
  );
  // слушатель лайка
  likeButton.addEventListener("click", likedCard);
  return placesItem;
};

// Функция удаления карточки

const deleteCard = (placesItem) => {
  placesItem.remove();
};

// Функция лайка

const likedCard = (card) => {
  if (card.target.classList.contains("card__like-button")) {
    card.target.classList.toggle("card__like-button_is-active");
  }
}
