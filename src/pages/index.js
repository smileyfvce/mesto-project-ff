// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов;
// при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, 
// которым нужно будет передавать объявленные здесь переменные и обработчики.

import './index.css';

// Подключаю модули
import '../components/cards.js';
import '../components/modal.js';

// Константы 
// popup
const popupAll = document.querySelectorAll('.popup');
const popupForm = document.querySelector('.popup__form');
const popupTitle = document.querySelector('.popup__title');
const saveButton = document.querySelector('.popup__button');
const closeButton = document.querySelector('.popup__close');
// popup редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
// popup добавления карточки 
const popupNewCard = document.querySelector('.popup_type_new-card');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_url');
// popup открытия изображения
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Обработчики событий
