// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов;
// при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей,
// которым нужно будет передавать объявленные здесь переменные и обработчики.

import "./index.css";

// Подключаю модули
import '../components/card.js';
import "../components/cards.js";
import "../components/modal.js";

// Импорт функций

import { openModal, closeModal } from "../components/modal.js";
import { initialCards } from '../components/cards.js';
import {
  createCard,
  deleteCard,
  likedCard,
} from "../components/card.js";

// DOM узлы

const placesList = document.querySelector(".places__list");



// Переменные редактора профиля

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Переменные добавления карточки

const formAddCard = document.forms["new-place"];
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupInputCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputUrl = document.querySelector(".popup__input_type_url");

// Переменные попапа картинки

const popupImage = document.querySelector(".popup_type_image");
const imageCard = document.querySelector(".popup__image");
const captionCard = document.querySelector(".popup__caption");

// кнопки

const profileEditBtn = document.querySelector(".profile__edit-button");
const popupCloseBtns = document.querySelectorAll(".popup__close");
const cardAddBtn = document.querySelector(".profile__add-button");

// кнопки закрытия попапов

popupCloseBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const popupItem = button.closest(".popup");
    closeModal(popupItem);
  });
});

// Функция редактора профиля

function createProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEditProfile);
}

// открываем редактор профиля

profileEditBtn.addEventListener("click", () => { 
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEditProfile)});

// слушаем форму

formEditProfile.addEventListener("submit", createProfileSubmit);

// попап добавления карточки!!!!!

function addCard(evt) {
  
  const nameImage = popupInputCardName.value;
  const linkImage = popupInputUrl.value;
  const card = createCard(
    {
      name: nameImage,
      link: linkImage,
    },
    deleteCard,
    likedCard,
    openImage
  );
  
  placesList.prepend(card);
  formAddCard.reset()
  evt.preventDefault();
  closeModal(popupAddNewCard);
}

// слушатели добавления карточки

cardAddBtn.addEventListener("click", () => openModal(popupAddNewCard));
formAddCard.addEventListener("submit", addCard);

// Вывести карточки на страницу

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, likedCard, openImage);
  placesList.append(card);
});

// функция открытия картинки

function openImage(name, link) {
  imageCard.src = link;
  imageCard.alt = name;
  captionCard.textContent = name;
  openModal(popupImage);
}
