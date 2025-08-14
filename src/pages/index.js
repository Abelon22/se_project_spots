import {
  settings,
  clearValidation,
  disableButton,
  enableValidation,
} from "../scripts/validation.js";
import Api from "../../utils/Api.js";

import styles from "./index.css";

// api instantiation

const formModalContainers = Array.from(document.querySelectorAll(".modal"));

const profileModal = document.getElementById("edit-profile-modal");

const postModal = document.getElementById("new-post-modal");

const profileModalCloseButton = profileModal.querySelector(
  ".modal__close-button"
);

const postModalCloseButton = postModal.querySelector(".modal__close-button");

const editProfileButton = document.querySelector("button.profile__edit-button");

const newPostButton = document.querySelector("button.profile__new-post-button");

const profileFormElement = profileModal.querySelector(".modal__form");

const nameInput = profileFormElement.querySelector("#profile-name");

const jobInput = profileFormElement.querySelector("#profile-description");

const profileNameElement = document.querySelector(".profile__name");

const profileImage = document.querySelector(".profile__avatar-image");

const profileJobElement = document.querySelector(".profile__title");

const addCardFormElement = postModal.querySelector(".modal__form");

const linkInput = addCardFormElement.querySelector("#profile-image");

const captionInput = addCardFormElement.querySelector("#profile-caption");

const cardTemplate = document.querySelector("#card-template").content;

const cardSection = document.querySelector(".cards__container");

const imageModal = document.querySelector(".preview-modal");
const imageModalCloseButton = imageModal.querySelector(
  ".preview-modal__close-button"
);
const modalImage = imageModal.querySelector(".preview-modal__image");
const modalCaption = imageModal.querySelector(".preview-modal__caption");

const allModals = [...formModalContainers, imageModal];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d4c8dc50-c7aa-4639-8c6f-3b7059b24ec3",
    "Content-Type": "application/json",
  },
});

enableValidation(settings);

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(
      ".modal.modal_is-opened, .preview-modal.modal_is-opened"
    );
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function setModalCloseEventListeners(modals) {
  modals.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("preview-modal")
      ) {
        closeModal(modal);
      }
    });
  });
}

setModalCloseEventListeners(allModals);

function getCardElement({ name, link }) {
  const cardElement = cardTemplate
    .querySelector(".cards__item")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".cards__name");
  const cardImage = cardElement.querySelector(".cards__image");

  const likeBtn = cardElement.querySelector(".cards__heart");
  const deleteBtn = cardElement.querySelector(".cards__delete");

  cardTitle.textContent = name;
  cardImage.setAttribute("alt", name);
  cardImage.src = link;

  cardImage.addEventListener("click", function (_) {
    modalCaption.textContent = name;
    modalImage.src = link;
    modalImage.alt = name;
    openModal(imageModal);
  });

  likeBtn.addEventListener("click", function (e) {
    likeBtn.classList.toggle("cards__heart_liked");
  });

  deleteBtn.addEventListener("click", function (_) {
    cardElement.remove();
  });

  return cardElement;
}

function closeModal(modalElem, className = "modal_is-opened") {
  modalElem.classList.remove(className);

  document.removeEventListener("keydown", handleEscapeKey);
}

function openModal(modalElem, className = "modal_is-opened") {
  modalElem.classList.add(className);

  document.addEventListener("keydown", handleEscapeKey);
}

function preloadForm(nameinput, jobinput, currentNameElem, currentJobElem) {
  nameinput.value = currentNameElem.textContent;
  jobinput.value = currentJobElem.textContent;

  console.log(`Name Input preloaded with ${currentNameElem.textContent}\n  
    Job Input preloaded with ${currentJobElem.textContent}
    `);
}

function setProfileTextContent(
  nameInputVal,
  jobInputVal,
  profileNameElem,
  jobDescriptElem
) {
  profileNameElem.textContent = nameInputVal;

  jobDescriptElem.textContent = jobInputVal;
}

imageModalCloseButton.addEventListener("click", function (e) {
  closeModal(imageModal);
});

editProfileButton.addEventListener("click", function (e) {
  openModal(profileModal);
  preloadForm(nameInput, jobInput, profileNameElement, profileJobElement);

  clearValidation(profileFormElement, settings);
});

profileModalCloseButton.addEventListener("click", function (e) {
  closeModal(profileModal);
});

newPostButton.addEventListener("click", function (e) {
  openModal(postModal);
});

postModalCloseButton.addEventListener("click", function (e) {
  closeModal(postModal);
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  const profileName = nameInput.value;
  const jobDescription = jobInput.value;

  setProfileTextContent(
    profileName,
    jobDescription,
    profileNameElement,
    profileJobElement
  );

  evt.currentTarget.reset();

  closeModal(profileModal);

  console.log(
    `Profile Edit Form Submitted with name ${profileName} and job description ${jobDescription}`
  );
}

function renderCard(data, container) {
  const cardElement = getCardElement(data);

  container.prepend(cardElement);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const data = { link: linkInput.value, name: captionInput.value };

  renderCard(data, cardSection);
  evt.currentTarget.reset();

  disableButton(addCardFormElement, settings);
  clearValidation(addCardFormElement, settings);

  closeModal(postModal);
}

profileFormElement.addEventListener("submit", handleFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Landscape view",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

initialCards.forEach((card) => {
  const cardElem = getCardElement(card);

  cardSection.prepend(cardElem);
});
