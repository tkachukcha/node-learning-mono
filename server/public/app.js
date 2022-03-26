document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;
    remove(id).then(() => {
      e.target.closest("li").remove();
    });
  }
  if (e.target.dataset.type === "edit") {
    const id = e.target.dataset.id;
    const newTitle = prompt("Enter new note title");
    const title = e.target.closest("li").querySelector("[data-type=title]");
    edit(id, JSON.stringify({title: newTitle})).then(()=> {title.innerText = newTitle});
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, payload) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Accept": "text/html",
      "Content-Type": "application/json",
    },
    body: payload,
  });
}
