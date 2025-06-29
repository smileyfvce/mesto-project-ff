//Тут будет работа модальных окон. Нужно будет экспортировать openModal и closeModal

// открытие попапа

export function openModal(popupItem) {
  popupItem.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
  document.addEventListener("mousedown", closeOverlay);
}

// закрытие попапа

export function closeModal(popupItem) {
  popupItem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
  document.removeEventListener("mousedown", closeOverlay);
}

// закрыть через Esc

function closeEscape(evt) {
  if (evt.key === "Escape") {
    const openClassModal = document.querySelector(".popup_is-opened");
    closeModal(openClassModal);
  }
}

// закрыть по оверлею

function closeOverlay(evt) {
  const openClassModal = document.querySelector(".popup_is-opened");
  if (evt.target === openClassModal) {
    closeModal(openClassModal);
  }
}
