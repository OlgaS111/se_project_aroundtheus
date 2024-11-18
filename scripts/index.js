const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseEditModal = document.querySelector("#profile-close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitle = document.querySelector(".card__text");
const cardUrl = document.querySelector(".card__image");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector("#card-close-modal");
const addCardModalSaveButton = addCardModal.querySelector(".modal__button");
const addCardForm = addCardModal.querySelector("#add-card-form");
const addCardTitleInput = addCardModal.querySelector("#card-title-input");
const addCardUrlInput = addCardModal.querySelector("#card-url-input");

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  addCardModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__text");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardTitleEl.alt = cardData.name;
  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileCloseEditModal.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// add new card
addNewCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});
addCardModalCloseButton.addEventListener("click", closePopup);

function addCardSubmit(e) {
  e.preventDefault;
  //cardTitle.textContent = addCardTitleInput.value;
  //cardUrl.textContent = addCardUrlInput.value
  renderCard(
    { name: addCardTitleInput.value, link: addCardUrlInput.value },
    cardListEl
  );
  closePopup();
  addCardForm.reset();
}
const renderCard = (cardData, cardListEl) => {
  cardListEl.prepend(getCardElement(cardData));
};

addCardForm.addEventListener("submit", addCardSubmit);

initialCards.forEach((cardData) => {
  //   const cardElement = getCardElement(cardData);
  //   cardListEl.prepend(cardElement);
  renderCard(cardData, cardListEl);
});
