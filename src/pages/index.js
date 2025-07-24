import "./index.css";

// Импорт функций
import { createCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "../components/validation.js";
import {
  getCards, // вывести карточку
  getUserInfo, // вывести информацию
  updateUserInfo, // обновить информацию
  postNewCard, // добавить новую карточку на сервер
  deleteCardFromServer, // удалить карточку с сервера
  putLike, // добавить лайк в массив
  deleteLike, // удалить лайк из массива
  updateAvatar, // обновить аватар
} from "../components/api.js";

// DOM узлы
const placesList = document.querySelector(".places__list");
let userId;

// попапы
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

// элементы попапов
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const imageCard = document.querySelector(".popup__image");
const captionCard = document.querySelector(".popup__caption");

// формы и инпуты
const avatarForm = document.forms["avatar"];
const formEditProfile = document.forms["edit-profile"];
const formAddCard = document.forms["new-place"];
const avatarInput = popupAvatar.querySelector(".popup__input_type_url");
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const jobInput = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
const popupInputCardName = popupAddNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupInputUrl = popupAddNewCard.querySelector(".popup__input_type_url");

// кнопки
const editAvatarButton = document.querySelector(".profile__image");
const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBtn = document.querySelector(".profile__add-button");
const popupCloseBtns = document.querySelectorAll(".popup__close");

// вызов включения валидации
enableValidation(validationConfig);

// функция отображения загрузки на кнопке
const loadBtn = (elem, load) => {
  const btn = elem.querySelector(".popup__button");
  if (load) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
};

// наполнение редактора профиля

const profileInfo = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

// функция редактирования аватара

const editAvatar = (evt) => {
  evt.preventDefault();
  loadBtn(evt.target, true);
  const linkAva = avatarInput.value;
  updateAvatar(linkAva)
    .then((user) => {
      editAvatarButton.style.backgroundImage = `url(${user.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadBtn(evt.target, false);
    });
};

// функция редактирования профиля

const editProfileInfo = (evt) => {
  evt.preventDefault();
  loadBtn(evt.target, true);
  const newInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };
  updateUserInfo(newInfo)
    .then((user) => {
      profileName.textContent = user.name;
      profileJob.textContent = user.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadBtn(evt.target, false);
    });
};

// функция добавления новой карточки

const addNewCard = (evt) => {
  evt.preventDefault();
  loadBtn(evt.target, true);
  const cardName = popupInputCardName.value;
  const cardUrl = popupInputUrl.value;
  postNewCard(cardName, cardUrl)
    .then((card) => {
      const newCard = createCard(
        card,
        userId,
        deleteCardFromServer,
        putLike,
        deleteLike,
        openImage
      );
      placesList.prepend(newCard);
      closeModal(popupAddNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadBtn(evt.target, false);
    });
};

// функция открытия картинки
const openImage = (name, link) => {
  imageCard.alt = name;
  imageCard.src = link;
  captionCard.textContent = name;
  openModal(popupImage);
}

Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    // информация о пользователе
    userId = user._id;
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    editAvatarButton.style.backgroundImage = `url(${user.avatar})`;
    // карточки
    cards.forEach((card) => {
      placesList.append(
        createCard(
          card,
          userId,
          deleteCardFromServer,
          putLike,
          deleteLike,
          openImage
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// СОБЫТИЯ

//КЛИК
// кнопка редактора аватара
editAvatarButton.addEventListener("click", () => {
  openModal(popupAvatar);
  clearValidation(avatarForm, validationConfig);
});
// кнопка редактора профиля
profileEditBtn.addEventListener("click", () => {
  openModal(popupEditProfile);
  profileInfo();
  clearValidation(formEditProfile, validationConfig);
});
// кнопка добавления карточки
cardAddBtn.addEventListener("click", () => {
  openModal(popupAddNewCard);
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
});
// кнопка закрытия попапов
popupCloseBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const popupItem = button.closest(".popup");
    closeModal(popupItem);
  });
});

// САБМИТ
// форма редактора аватара
avatarForm.addEventListener("submit", editAvatar);
// форма редактора профиля
formEditProfile.addEventListener("submit", editProfileInfo);
// форма добавления карточки
formAddCard.addEventListener("submit", addNewCard);
