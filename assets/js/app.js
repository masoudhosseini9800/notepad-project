/////////////// variables ///////////////

const noteList = document.querySelector("#note-list");
// const textArea = document.querySelector("#note");

/////////////// eventlisteners ///////////////

eventListeners();
function eventListeners() {
  // form submition
  document.querySelector("#form").addEventListener("submit", newNote);

  // remove note
  document.querySelector("#note-list").addEventListener("click", removeNote);

  // get data from localStorage on loaded
  document.addEventListener("DOMContentLoaded", localStorageOnLoad);
}

/////////////// functions ///////////////

// adding new note to the list
function newNote(e) {
  e.preventDefault();

  // access to textarea value
  const textAreaValue = document.querySelector("#note").value;

  // create remove icon
  const removeBtn = document.createElement("a");
  removeBtn.textContent = "X";
  removeBtn.classList.add("remove-note");

  // create <li> tag
  const liTag = document.createElement("li");
  liTag.appendChild(document.createTextNode(textAreaValue));
  liTag.appendChild(removeBtn);

  // adding <li> to the DOM
  noteList.appendChild(liTag);

  // empty textarea value
  //   textArea.value = "";
  this.reset();

  // add note to the local storage
  addNoteToLocalStorage(textAreaValue);

  // show result to user
  alert("یادداشت با موفقیت ذخیره شد");
}

// remove note from the list with remove icon
function removeNote(e) {
  if (e.target.classList.contains("remove-note")) {
    e.target.parentElement.remove();
  }

  // also remove the note from local stroage
  removeNoteLocalStorage(e.target.parentElement.textContent);
}

// adding note to the localstorage
function addNoteToLocalStorage(textAreaValue) {
  const notes = getNotesFromLocalStorage();

  notes.push(textAreaValue);

  localStorage.setItem("notes", JSON.stringify(notes));
}

// get notes from local storage
function getNotesFromLocalStorage() {
  let notes;
  let getFromLS = localStorage.getItem("notes");
  if (getFromLS === null) {
    notes = [];
  } else {
    notes = JSON.parse(getFromLS);
  }
  return notes;
}

// get data from localStorage on load
function localStorageOnLoad() {
  const notes = getNotesFromLocalStorage();

  notes.forEach((textAreaValue) => {
    // create remove icon
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-note");

    // create <li> tag
    const liTag = document.createElement("li");
    liTag.appendChild(document.createTextNode(textAreaValue));
    liTag.appendChild(removeBtn);

    // adding <li> to the DOM
    noteList.appendChild(liTag);
  });
}

// also remove note from localStorage
function removeNoteLocalStorage(noteContent) {
  const noteDeleted = noteContent.substring(0, noteContent.length - 1);

  const notesFromLS = getNotesFromLocalStorage();

  notesFromLS.forEach((note, index) => {
    if (note === noteDeleted) {
      notesFromLS.splice(index, 1);
    }
  });

  localStorage.setItem("notes", JSON.stringify(notesFromLS));
}
