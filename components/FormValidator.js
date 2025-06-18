export default class FormValidator {
  constructor(settings, formEl) {
    this._form = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _toggleButtonState(inputEls, submitButton) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton(submitButton);
    } else {
      this._enableButton(submitButton);
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this.showInputError(inputEl);
    }

    this._hideInputError(inputEl);
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputEls, this._submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  _disableButton(submitButton) {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  _enableButton(submitButton) {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hideInputError(inputEl) {
    const errorMesssageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMesssageEl.textContent = "";
    errorMesssageEl.classList.remove(this._errorClass);
  }
}
