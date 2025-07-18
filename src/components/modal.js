export { openModal, closeModal };

// функция открытия попапа

const openModal = (popupItem) => {
  popupItem.classList.add("popup_is-opened");
  popupItem.classList.add("popup_is-animated");
  document.addEventListener("keydown", closeEscape);
  popupItem.addEventListener("mousedown", closeOverlay);
}

// функция закрытия попапа

const closeModal = (popupItem) => {
  popupItem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
  popupItem.removeEventListener("mousedown", closeOverlay);
}

// закрыть через Esc

const closeEscape = (evt) => {
  if (evt.key === "Escape") {
    const openClassModal = document.querySelector(".popup_is-opened");
    closeModal(openClassModal);
  }
}

// закрыть по оверлею

const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}
