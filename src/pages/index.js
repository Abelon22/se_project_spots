import {
  settings,
  clearValidation,
  disableButton,
  enableValidation,
} from "../scripts/validation.js";
import Api from "../../utils/Api.js";

import styles from "./index.css";

const formModalContainers = Array.from(document.querySelectorAll(".modal"));

const profileModal = document.getElementById("edit-profile-modal");

const profileModalCloseButton = profileModal.querySelector(
  ".modal__close-button"
);

const editProfileButton = document.querySelector("button.profile__edit-button");

const profileFormElement = profileModal.querySelector(".modal__form");

const nameInput = profileFormElement.querySelector("#profile-name");

const jobInput = profileFormElement.querySelector("#profile-description");

const profileNameElement = document.querySelector(".profile__name");

const profileJobElement = document.querySelector(".profile__title");

const avatarModal = document.getElementById("edit-avatar-modal");

const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-button");

const avatarModalForm = avatarModal.querySelector(".modal__form");

const avatarEditButton = document.querySelector(
  "button.profile__avatar-edit-button"
);
const profileImage = document.querySelector(".profile__avatar-image");

const deleteModal = document.querySelector("#delete-modal");

const deleteModalCloseBtn = deleteModal.querySelector(
  ".modal__close-button_delete"
);

const deleteModalForm = deleteModal.querySelector(".modal__form");

const deleteModalCancel = deleteModal.querySelector(".modal__cancel-button");

const postModal = document.getElementById("new-post-modal");
const newPostButton = document.querySelector("button.profile__new-post-button");
const postModalCloseButton = postModal.querySelector(".modal__close-button");
const addCardFormElement = postModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template").content;

const cardSection = document.querySelector(".cards__container");

const imageModal = document.querySelector(".preview-modal");
const imageModalCloseButton = imageModal.querySelector(
  ".preview-modal__close-button"
);
const modalImage = imageModal.querySelector(".preview-modal__image");
const modalCaption = imageModal.querySelector(".preview-modal__caption");

const allModals = [...formModalContainers, imageModal];

const modalToCloseButton = {
  avatar: {
    button: avatarModalCloseBtn,
    modal: avatarModal,
  },
  delete: {
    button: deleteModalCloseBtn,
    modal: deleteModal,
  },
  image: {
    button: imageModalCloseButton,
    modal: imageModal,
  },
  post: {
    button: postModalCloseButton,
    modal: postModal,
  },
  profile: {
    button: profileModalCloseButton,
    modal: profileModal,
  },
};

// Api Instantiation

// Global selection variables

let selectedId;
let selectedCard;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d4c8dc50-c7aa-4639-8c6f-3b7059b24ec3",
    "Content-Type": "application/json",
  },
});

function closeModal(modalElem, className = "modal_is-opened") {
  modalElem.classList.remove(className);

  document.removeEventListener("keydown", handleEscapeKey);
}

function openModal(modalElem, className = "modal_is-opened") {
  modalElem.classList.add(className);

  document.addEventListener("keydown", handleEscapeKey);
}

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

function setCloseIconEventListeners(modalToCloseMap) {
  Object.values(modalToCloseMap).forEach(({ button, modal }) => {
    button.addEventListener("click", function (_) {
      closeModal(modal);
    });
  });
}

function handleAvatarUpdate(e) {
  e.preventDefault();

  const thisForm = e.currentTarget;

  const thisButton = thisForm.querySelector("button[type='submit']");

  const formData = new FormData(thisForm);

  const profileLink = (formData.get("profile-picture") || "").trim();

  const thisLoading = handleLoading.bind(null, thisButton, "Save", "Saving...");

  console.log(profileLink);

  thisLoading(true);

  api
    .updateUserAvatar(profileLink)
    .then((res) => {
      profileImage.src = res.avatar;
      thisForm.reset();
      closeModal(avatarModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      thisLoading(false);
    });
}

function getCardElement(card) {
  console.log(card, "\n\n");
  const cardElement = cardTemplate
    .querySelector(".cards__item")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".cards__name");
  const cardImage = cardElement.querySelector(".cards__image");

  const likeBtn = cardElement.querySelector(".cards__heart");
  if (card.isLiked) {
    likeBtn.classList.add("cards__heart_liked");
  }
  const deleteBtn = cardElement.querySelector(".cards__delete");

  cardTitle.textContent = card.name;
  cardImage.setAttribute("alt", card.name);
  cardImage.src = card.link;

  cardImage.addEventListener("click", function (_) {
    modalCaption.textContent = card.name;
    modalImage.src = card.link;
    modalImage.alt = card.name;
    openModal(imageModal);
  });

  likeBtn.addEventListener("click", function (e) {
    if (likeBtn.dataset.busy === "1") return;
    // Trying to account for double clicking the like button.

    likeBtn.dataset.busy = "1";

    const currentlyLiked = likeBtn.classList.contains("cards__heart_liked");

    const reqPromise = currentlyLiked
      ? api.dislikeCard(card._id)
      : api.likeCard(card._id);

    reqPromise
      .then((data) => {
        const isLiked = data?.isLiked ?? !currentlyLiked;

        likeBtn.classList.toggle("cards__heart_liked", isLiked);

        card.isLiked = isLiked;

        console.log(
          `Card with id: ${card._id} ${isLiked ? "liked" : "disliked"}`
        );
      })
      .catch((err) => {
        console.error(
          `Error toggling like for Card with id ${card._id} Error: ${err}`
        );
      })
      .finally(() => {
        likeBtn.dataset.busy = "0";
      });
  });

  deleteBtn.addEventListener("click", function (_) {
    handleDeleteCard(card._id, cardElement);
  });

  return cardElement;
}

function handleDeleteCard(idSelected, cardSelected) {
  openModal(deleteModal);

  selectedCard = cardSelected;
  selectedId = idSelected;
}

function handleCancel() {
  selectedId = null;
  selectedCard = null;
  closeModal(deleteModal);
}

function handleLoading(buttonEl, defaultText, loadingText, isLoading) {
  if (!buttonEl) return;

  if (isLoading) {
    buttonEl.disabled = true;
    buttonEl.textContent = loadingText;
  } else {
    buttonEl.disabled = false;
    buttonEl.textContent = defaultText;
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const thisForm = evt.currentTarget;

  const formData = new FormData(thisForm);

  const thisButton = thisForm.querySelector('button[type="submit"]');

  const thisLoading = handleLoading.bind(null, thisButton, "Save", "Saving...");

  thisLoading(true);

  console.log(thisButton);

  const profName = (formData.get("name") || "").trim();
  const profDescription = (formData.get("description") || "").trim();

  api
    .updateUserInfo({ name: profName, about: profDescription })
    .then((res) => {
      setProfileTextContent(
        profName,
        profDescription,
        profileNameElement,
        profileJobElement
      );
      closeModal(profileModal);
      thisForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      thisLoading(false);
    });

  console.log(
    `Profile Edit Form Submitted with name ${profName} and job description ${profDescription}`
  );
}

function renderCard(data, container) {
  const cardElement = getCardElement(data);

  container.prepend(cardElement);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const thisForm = evt.currentTarget;

  const formData = new FormData(thisForm);

  const thisButton = thisForm.querySelector('button[type="submit"]');

  const thisLoading = handleLoading.bind(null, thisButton, "Save", "Saving...");

  const link = (formData.get("image-link") || "").trim();
  const name = (formData.get("caption") || "").trim();

  const data = { link, name };

  thisLoading(true);

  api
    .createCard(data)
    .then((res) => {
      console.log(res);

      renderCard(res, cardSection);
      thisForm.reset();
      disableButton(addCardFormElement, settings);
      clearValidation(addCardFormElement, settings);

      closeModal(postModal);
    })
    .catch((err) =>
      console.error(`Error creating card with ${name} and ${link} ${err}`)
    )
    .finally(() => {
      thisLoading(false);
    });
}

function handleDeleteSubmit(e) {
  e.preventDefault();

  if (selectedId === null) return;

  console.log("SELECTED CARD IN HANDLE DELETE SUBMIT", selectedCard);

  const thisForm = e.currentTarget;

  const thisButton = thisForm.querySelector('button[type="submit"]');

  const thisLoading = handleLoading.bind(
    null,
    thisButton,
    "Delete",
    "Deleting..."
  );

  thisLoading(true);

  api
    .deleteCard(selectedId)
    .then((res) => {
      deleteModal.classList.remove("modal_is-opened");

      selectedCard.remove();

      selectedId = null;
      selectedCard = null;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      thisLoading(false);
    });
}

function renderCards(cards) {
  cardSection.innerHTML = "";
  cards.forEach((card) => {
    const cardElem = getCardElement(card);
    cardSection.prepend(cardElem);
  });
}

setModalCloseEventListeners(allModals);

setCloseIconEventListeners(modalToCloseButton);

avatarEditButton.addEventListener("click", function (_) {
  openModal(avatarModal);
  clearValidation(avatarModalForm, settings);
});

editProfileButton.addEventListener("click", function (e) {
  openModal(profileModal);
  preloadForm(nameInput, jobInput, profileNameElement, profileJobElement);

  clearValidation(profileFormElement, settings);
});

newPostButton.addEventListener("click", function (e) {
  openModal(postModal);
});

deleteModalCancel.addEventListener("click", handleCancel);

avatarModalForm.addEventListener("submit", handleAvatarUpdate);

deleteModalForm.addEventListener("submit", handleDeleteSubmit);

profileFormElement.addEventListener("submit", handleFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

function initiateApp() {
  api
    .getUserInfo()
    .then(({ name, about, avatar, _id }) => {
      profileImage.src = avatar;
      profileJobElement.textContent = about;
      profileNameElement.textContent = name;
      console.log("User info loaded successfully");

      return api.getCards();
    })
    .then((cards) => {
      console.log("Cards loaded:", cards);
      renderCards(cards);
    })
    .catch((err) => {
      console.error("Error during app initialization:", err);

      if (err.message && err.message.includes("getUserInfo")) {
        console.error("Failed to load user info");
      } else if (err.message && err.message.includes("getCards")) {
        console.error("Failed to load cards");
      } else {
        console.error("General app initialization error");
      }
    });
}

initiateApp();

enableValidation(settings);
