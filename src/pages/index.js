// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов;
// при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей,
// которым нужно будет передавать объявленные здесь переменные и обработчики.

import "./index.css";

// Подключаю модули
import "../components/cards.js";
import "../components/modal.js";

// Импорт функций

import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCard } from "../components/cards.js";

// профиль

const profileName = document.querySelector("profile__title");
const profileJob = document.querySelector("profile__description");

// все попапы

const popups = document.querySelectorAll("popup");
export const openModalClass = ".popup_is-opened";
// попап редактора профиля

const popupEditProfile = document.querySelector("popup_type_edit");
const formElement = document.querySelector("popup__form");
const nameInput = document.querySelector("popup__input_type_name");
const jobInput = document.querySelector(
  "popup__input_type_description"
);

// кнопки

const profileEditBtn = document.querySelector(".profile__edit-button");
const popupCloseBtn = document.querySelector("popup__close");

// Редактор профиля

profileEditBtn.addEventListener("click", function() {
  openModal(popupEditProfile)
});
