export { createCard };

// Функция создания карточки
const createCard = (
  card,
  userId,
  deleteCard,
  likedCard,
  dislikedCard,
  openImage
) => {
  const cardTemplate = document.querySelector("#card-template").content; // темплейт карточки
  const placesItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); // карточка
  const cardImage = placesItem.querySelector(".card__image"); // картинка
  const cardTitle = placesItem.querySelector(".card__title"); // заголовок
  const deleteButton = placesItem.querySelector(".card__delete-button"); // кнопка удаления
  const likeButton = placesItem.querySelector(".card__like-button"); // кнопка лайка
  const likeCount = placesItem.querySelector(".card__like-count"); // счётчик лайка
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `Фотография места: ${card.name}`;
  likeCount.textContent = card.likes.length;
  placesItem.dataset.cardId = card._id;

  // если карта наша, то слушаем кнопку / если нет то прячем корзину
  if (card.owner._id === userId) {
    // событие (клик на корзину)
    deleteButton.addEventListener("click", () => {
      deleteCard(card._id)
        .then(() => {
          placesItem.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    // прячем
    deleteButton.remove();
  }

  // красим наши лайки
  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // событие (клик на кнопку лайка)

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      dislikedCard(card._id)
        .then((card) => {
          likeButton.classList.remove("card__like-button_is-active");
          likeCount.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likedCard(card._id)
        .then((elem) => {
          likeButton.classList.add("card__like-button_is-active");
          likeCount.textContent = elem.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // событие (клик на картинку)

  cardImage.addEventListener("click", () => {
    openImage(card.name, card.link);
  });

  return placesItem;
};
