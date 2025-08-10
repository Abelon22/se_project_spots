const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__error",
  errorVisibleClass: "modal__error_visible",
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

function checkInputValidity(inputElement, config) {
  const errorSpan = inputElement
    .closest(".modal__input-group")
    .querySelector(config.errorClass);

  if (!inputElement.checkValidity()) {
    errorSpan.textContent = inputElement.validationMessage;
    showInputError(inputElement, errorSpan, config);
  } else {
    errorSpan.textContent = "";
    hideInputError(inputElement, errorSpan, config);
  }
}

function showInputError(input, modal, settings) {
  input.classList.add(settings.inputErrorClass);
  modal.classList.add(settings.errorVisibleClass);
}

function hideInputError(input, modal, settings) {
  input.classList.remove(settings.inputErrorClass);
  modal.classList.remove(settings.errorVisibleClass);
}

function toggleButtonState(inputList, buttonElement, config) {
  const hasInvalidInput = inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const buttonElem = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  toggleButtonState(inputList, buttonElem, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(evt.currentTarget, config);
      toggleButtonState(inputList, buttonElem, config);
    });
  });
}

function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    const errorSpan = inputElement
      .closest(".modal__input-group")
      .querySelector(config.errorClass);

    hideInputError(inputElement, errorSpan, config);
    errorSpan.textContent = "";
  });

  toggleButtonState(inputList, buttonElement, config);
}

function disableButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

enableValidation(settings);

export { settings, clearValidation, disableButton };
