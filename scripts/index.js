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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseEditModal = document.querySelector("#profile-close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-edit-form"];
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
const imageModal = document.querySelector("#image-modal");
const openImageCloseButton = document.querySelector("#image-close-modal");
const imageModalPicture = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector(".modal__title");

function closePopupOnEsc(e) {
  if (e.key === "Escape") {
    const currentlyOpenedPopup = document.querySelector(".modal_opened");
    closePopup(currentlyOpenedPopup);
  }
}

function handleOverlayClick(e) {
  if (e.target.classList.contains("modal")) {
    closePopup(e.target);
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupOnEsc);
  document.addEventListener("click", handleOverlayClick);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupOnEsc);
  document.removeEventListener("click", handleOverlayClick);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteCardButton = cardElement.querySelector(".card__button--delete");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteCardButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(imageModal);
    imageModalPicture.src = cardData.link;
    imageModalTitle.textContent = cardData.name;
    imageModalPicture.alt = cardData.name;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileCloseEditModal.addEventListener("click", () =>
  closePopup(profileEditModal)
);

openImageCloseButton.addEventListener("click", () => {
  closePopup(imageModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// add new card
addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

function handleCardFormSubmit(e) {
  e.preventDefault();
  renderCard(
    { name: addCardTitleInput.value, link: addCardUrlInput.value },
    cardListEl
  );
  closePopup(addCardModal);
  addCardForm.reset();
}

const renderCard = (cardData, cardListEl) => {
  cardListEl.prepend(getCardElement(cardData));
};

addCardForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});
