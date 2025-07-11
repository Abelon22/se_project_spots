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
