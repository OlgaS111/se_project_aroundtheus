import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationSettings } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";

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

// Form validators
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

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
  //imageModal.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupOnEsc);
  document.addEventListener("click", handleOverlayClick);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupOnEsc);
  document.removeEventListener("click", handleOverlayClick);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    imageModalPicture.src = cardData.link;
    imageModalTitle.textContent = cardData.name;
    imageModalPicture.alt = cardData.name;
    openPopup(imageModal);
  });

  return card.getView();
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
  addCardFormValidator.resetValidation();
}

const renderCard = (cardData, cardListEl) => {
  cardListEl.prepend(getCardElement(cardData));
};

addCardForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});
