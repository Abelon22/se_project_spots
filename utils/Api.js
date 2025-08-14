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

  setUpProfileInfo() {
    fetch(`${this._baseUrl}/users/me`).then((res) => {
      const response = this._handleServerResponse(res);
      console.log(response);
    });
  }
}

export default Api;
