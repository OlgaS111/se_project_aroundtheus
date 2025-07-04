export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this._cardTemplate =
      document.querySelector(cardSelector).content.firstElementChild;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteCardButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleImageClick(getView) {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  getView(cardData) {
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__text");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteCardButton = this._cardElement.querySelector(
      ".card__button--delete"
    );

    cardTitleEl.textContent = this._name;

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
