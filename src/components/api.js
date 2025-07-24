export {
  getCards, // вывести карточку
  getUserInfo, // вывести информацию
  updateUserInfo, // обновить информацию
  postNewCard, // добавить новую карточку на сервер
  deleteCardFromServer, // удалить карточку с сервера
  putLike, // добавить лайк в массив
  deleteLike, // удалить лайк из массива
  updateAvatar, // обновить аватар
};

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-42",
  headers: {
    authorization: "7d693a10-239b-4e8a-9e6c-5ec746eb9fb2",
    "Content-Type": "application/json",
  },
};

// Получение ответа от сервера

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промисы
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получаем информацию о пользователе

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// Получаем карточки с сервера

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// Обновление информации профиля

const updateUserInfo = (info) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: info.name,
      about: info.about,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

// Создание новой карточки

const postNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

// Удаление карточки

const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// Получаем лайки

const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// Удаление лайка

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// Обновление аватара

const updateAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};
