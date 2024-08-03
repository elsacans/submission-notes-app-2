const API_BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  //   Gunakan Fungsi ini untuk membuat note baru ke API
  static createNote(note) {
    return fetch(`${this.API_BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
      .then((responseJson) => {
        if (responseJson.length > 0) {
          return Promise.resolve(responseJson);
        } else {
          return Promise.reject(new Error(`Note is not found`));
        }
      });
  }

  //   Gunakan Fungsi ini untuk pengambil data dari API
  static getNotes() {
    return fetch(`${API_BASE_URL}/notes`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
      .then((responseJson) => {
        const { data: notes } = responseJson;
        return Promise.resolve(notes);
      });
  }

  //   Panggil Fungsi ini untuk Menghapus data dari API
  static deleteNote(id) {
    return fetch(`${this.API_BASE_URL}/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
      .then((responseJson) => {
        if (responseJson.length > 0) {
          return Promise.resolve(responseJson);
        } else {
          return Promise.reject(new Error(`Note is not found`));
        }
      });
  }
  
}

export default NotesApi;
