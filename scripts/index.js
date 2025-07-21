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

const profileJobElement = document.querySelector(".profile__title");

const addCardFormElement = postModal.querySelector(".modal__form");

const linkInput = addCardFormElement.querySelector("#profile-image");

const captionInput = addCardFormElement.querySelector("#profile-caption");

console.log(addCardFormElement);

function closeModal(modalElem, className = "modal_is-opened") {
  modalElem.classList.remove(className);
}

function openModal(modalElem, className = "modal_is-opened") {
  modalElem.classList.add(className);
}

function preloadForm(nameinput, jobinput, currentNameElem, currentJobElem) {
  if (!nameinput || !jobinput || !currentNameElem || !currentJobElem) {
    return;
  }

  nameInput.value = currentNameElem.textContent;
  jobInput.value = currentJobElem.textContent;

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
  if (!nameInputVal || !jobInputVal || !profileNameElem || !jobDescriptElem) {
    return;
  }

  profileNameElem.textContent = nameInputVal;

  jobDescriptElem.textContent = jobInputVal;
}

editProfileButton.addEventListener("click", function (e) {
  openModal(profileModal);
  preloadForm(nameInput, jobInput, profileNameElement, profileJobElement);
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

  closeModal(profileModal);

  console.log(
    `Profile Edit Form Submitted with name ${profileName} and job description ${jobDescription}`
  );
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(`The image link input value is currently ${linkInput.value}`);

  console.log(`The caption input value is currently ${captionInput.value}`);

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
];

initialCards.forEach((card) => console.log(card));
