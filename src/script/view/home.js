import utils from "../utils.js";

import NotesApi from "../data/remote/notes-app.js";

const months = {
  1: "Januari",
  2: "Februari",
  3: "Maret",
  4: "April",
  5: "Mei",
  6: "Juni",
  7: "Juli",
  8: "Agustus",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "Desember",
};

const home = async () => {
  const addBox = document
      .querySelector("notes-item")
      .shadowRoot.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descriptionTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");

  // Mendapatkan localStorage jika ada dan menguraikannya menjadi object js
  // Jika tidak melewatkan array kosong ke notes
  let isUpdate = false,
    updateId;

  // Mendapatkan data dari local dan menguraikannya menjadi object untuk di tampilkan
  const notes = await NotesApi.getNotes();

  // fungsi untuk menampilkan semua notes
  function showNotes() {
    document.querySelectorAll(".note").forEach((note) => note.remove());
    notes.forEach((note, index) => {
      let liTag = `<li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.body}</span>
                            </div>
                            <div class="bottom-content">
                                <span>${formatDate(note.createdAt)}</span>
                                <div class="settings">
                                    <i onclick="showMenu(this)" class="bi bi-three-dots"></i>
                                    <ul class="menu">
                                        <li onclick="updateNotes(${index}, '${
        note.title
      }', '${note.description}')"><i class="bi bi-pencil-square"></i>Edit</li>
                                        <li onclick="deleteNote(${index})"><i class="bi bi-trash-fill"></i>Delete</li>
                                    </ul>
                                </div>
                            </div>
                        </li>`;
      addBox.insertAdjacentHTML("afterend", liTag);
    });
  }

  // fungsi untuk melakukan format data tanggal dari data lokal "data/notes.js"
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  }

  // menampilkan menu pada tiap notes
  function showMenu(elem) {
    elem.parentElement.classList.add("show");
  }

  // menghapus notes yang dipilih dari data array notes dan menampilkan kembali sisanya
  function deleteNote(noteId) {
    notes.splice(noteId, 1); // memindahkan note yang dipilih dari array/tasks
    showNotes();
  }

  // fungsi mengupdate notes, (belum berfungsi)
  function updateNotes(noteId, title, description) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descriptionTag.value = description;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";

    console.log(noteId);
  }

  addBox.addEventListener("click", () => {
    popupBox.classList.add("show");
  });

  closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show");
    titleTag.value = "";
    descriptionTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a  new Note";
  });

  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let noteTitle = titleTag.value,
      noteDesc = descriptionTag.value;

    if (noteTitle || noteDesc) {
      // deklarasi data tanggal terkini
      const date = new Date().toISOString();

      // deklarasi objek notes baru
      let noteInfo = {
        id: `notes-${Math.random().toString(36).substr(2, 9)}`,
        title: noteTitle,
        body: noteDesc,
        createdAt: date,
        archived: false,
      };

      console.log(date);

      if (!isUpdate) {
        // menyimpan data ke lokal
        notes.push(noteInfo); // menambahkan note baru ke notes
      } else {
        notes[updateId] = noteInfo; // mengupdate spesifik note
      }

      // Menyimpan data ke local storage

      // menampilkan notes yang telah di perbarui
      showNotes();
    }
  });

  window.showMenu = showMenu;
  window.deleteNote = deleteNote;
  window.updateNotes = updateNotes;

  // fungsi yang pertama dijalankan saat fungsi home di panggil
  showNotes();
};

export default home;
