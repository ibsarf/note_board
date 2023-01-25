const newNote = document.querySelector("#new-note");

// console.log(newNote);
newNote.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="header">
        <i class="fa-solid fa-thumbtack"></i>
        <div class="pen"><i class="fa-solid fa-pen edit"></i><i class="fa-solid fa-eraser delete"></i></div>
    </div>
    <div class="main ${text ? "" : "hidden"} "></div>
    <textarea class="textarea  ${text ? "hidden" : ""}"></textarea>`;
  document.body.appendChild(note);

  const deleteBtn = note.querySelector(".delete");
  deleteBtn.addEventListener("click", () => {
    note.remove(text);
    localStrage();
  });

  const editBtn = note.querySelector(".edit");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.value = text;
  main.innerHTML = marked.parse(text);

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    localStrage();
  });
  document.body.appendChild(note);
}
// localStrage

function localStrage() {
  const noteText = document.querySelectorAll("textarea");
  const notes = [];
  noteText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}

const notes = JSON.parse(localStorage.getItem("notes"));
// console.log(notes);
notes.forEach((note) => addNewNote(note));
