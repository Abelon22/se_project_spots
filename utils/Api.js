class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  _request(path, method, options = {}) {
    const config = {
      method: method || "GET",
      headers: { ...this._headers, ...(options.headers || {}) },
      mode: "cors",
      ...options,
    };

    return fetch(`${this._baseUrl}${path}`, config).then((response) =>
      this._handleServerResponse(response)
    );
  }

  getUserInfo() {
    return this._request(`/users/me`)
      .then((data) => {
        console.log("User info fetched:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        throw err;
      });
  }

  updateUserInfo({ name, about }) {
    return this._request(`/users/me`, "PATCH", {
      body: JSON.stringify({ name, about }),
    })
      .then((data) => {
        console.log("User info updated:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error updating user info:", err);
        throw err;
      });
  }

  updateUserAvatar(avatarUrl) {
    return this._request(`/users/me/avatar`, "PATCH", {
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then((data) => {
        console.log("User avatar updated:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error updating avatar:", err);
        throw err;
      });
  }

  createInitialCards(initialCards) {
    return this._request(`/cards`)
      .then((currentCards) => {
        const cardsToCreate = initialCards.filter(
          (card) => !currentCards.some((c) => c.link === card.link)
        );

        if (cardsToCreate.length === 0) {
          return [];
        }

        const cardPromises = cardsToCreate.map((card) => {
          return this._request(`/cards`, "POST", {
            body: JSON.stringify({ name: card.name, link: card.link }),
          });
        });

        return Promise.all(cardPromises);
      })
      .catch((err) => {
        console.error("Error creating initial cards:", err);
        throw err;
      });
  }

  getCards() {
    return this._request(`/cards`)
      .then((data) => {
        console.log("Cards fetched:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
        throw err;
      });
  }

  // POST /cards – Create a card
  createCard({ name, link }) {
    return this._request(`/cards`, "POST", {
      body: JSON.stringify({ name, link }),
    })
      .then((data) => {
        console.log("Card created:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error creating card:", err);
        throw err;
      });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, "DELETE")
      .then((data) => {
        console.log(`Card ${cardId} deleted:`, data);
        return data;
      })
      .catch((err) => {
        console.error(`Error deleting card ${cardId}:`, err);
        throw err;
      });
  }

  // PUT /cards/:cardId/likes – Like a card
  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, "PUT")
      .then((data) => {
        console.log(`Card ${cardId} liked:`, data);
        return data;
      })
      .catch((err) => {
        console.error(`Error liking card ${cardId}:`, err);
        throw err;
      });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, "DELETE")
      .then((data) => {
        console.log(`Card ${cardId} disliked:`, data);
        return data;
      })
      .catch((err) => {
        console.error(`Error disliking card ${cardId}:`, err);
        throw err;
      });
  }

  deleteAllCards() {
    return this.getInitialCards()
      .then((cards) => {
        if (cards.length === 0) {
          console.log("No cards to delete");
          return [];
        }

        console.log(`Found ${cards.length} cards to delete`);

        const deleted = [];
        return cards
          .reduce((chain, card) => {
            return chain
              .then(() => this.deleteCard(card._id))
              .then((result) => {
                deleted.push(result);
              });
          }, Promise.resolve())
          .then(() => deleted);
      })
      .then((deleteResults) => {
        console.log(`Successfully deleted ${deleteResults.length} cards`);
        return deleteResults;
      })
      .catch((err) => {
        console.error("Error deleting all cards:", err);
        throw err;
      });
  }
}

export default Api;
