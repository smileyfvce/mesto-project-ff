//Тут будет работа модальных окон. Нужно будет экспортировать openModal и closeModal

// функция открытия и закрытия попапа

export function openModal(popupItem) {
  popupItem.classList.add('popup_is-opened');
  document.addEventListener("keydown", closeEscape);
}

function closeModal(popupItem) {
  popupItem.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closeEscape);
}

function closeEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(popupItem);
  }
}
