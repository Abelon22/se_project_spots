const profileModal = document.getElementById("edit-profile-modal");
const postModal = document.getElementById("new-post-modal");

const profileModalCloseButton = profileModal.querySelector(
  ".modal__close-button"
);

const postModalCloseButton = postModal.querySelector(".modal__close-button");

const editProfileButton = document.querySelector("button.profile__edit-button");

const newPostButton = document.querySelector("button.profile__new-post-button");

editProfileButton.addEventListener("click", function (e) {
  profileModal.classList.add("modal_is-opened");
});

profileModalCloseButton.addEventListener("click", function (e) {
  profileModal.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", function (e) {
  postModal.classList.add("modal_is-opened");
});

postModalCloseButton.addEventListener("click", function (e) {
  postModal.classList.remove("modal_is-opened");
});

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
