document.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (e.target.dataset.type === 'remove') {
    remove(id).then(() => {
      e.target.closest('li').remove();
    });
  }
  if (e.target.dataset.type === 'edit') {
    toggleBtns(e, id);
  }
  if (e.target.dataset.type === 'save') {
    toggleBtns(e, id);
    const newTitle = document.querySelector(`input[data-id="${id}"]`).value;
    if (newTitle === '') {
      alert('Title must not be empty');
      document.querySelector(`input[data-id="${id}"]`).value =
      document.querySelector(`[data-type="title"][data-id="${id}"]`).innerText;
      toggleBtns(e, id);
      return;
    }
    edit(id, JSON.stringify({ title: newTitle })).then(
      () =>
        (document.querySelector(
          `[data-type="title"][data-id="${id}"]`
        ).innerText = document.querySelector(`input[data-id="${id}"]`).value)
    );
  }
  if (e.target.dataset.type === 'cancel') {
    toggleBtns(e, id);
    document.querySelector(`input[data-id="${id}"]`).value =
      document.querySelector(`[data-type="title"][data-id="${id}"]`).innerText;
  }
});

function toggleEditInput(id) {
  document
    .querySelector(`.form-group[data-id="${id}"]`)
    .classList.toggle('hide');
  document
    .querySelector(`[data-id="${id}"][data-type="title"]`)
    .classList.toggle('hide');
}

function toggleBtns(event, id) {
  event.target.classList.toggle('hide');
  const btnTypesArr = ['remove', 'edit', 'cancel', 'save'];
  const filteredArr = btnTypesArr.filter(
    (type) => type !== event.target.dataset.type
  );
  filteredArr.forEach((type) => {
    toggleBtnHide(event, type);
  });
  toggleEditInput(id);
}

function toggleBtnHide(event, type) {
  event.target
    .closest('li')
    .querySelector(`[data-type=${type}]`)
    .classList.toggle('hide');
}

function editWithPrompt() {
  let newTitle = prompt('Enter new note title');
  if (newTitle === '') {
    alert('New title must not be empty');
    return;
  }
  const title = e.target.closest('li').querySelector('[data-type=title]');
  edit(id, JSON.stringify({ title: newTitle })).then(() => {
    title.innerText = newTitle;
  });
}

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function edit(id, payload) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'text/html',
      'Content-Type': 'application/json',
    },
    body: payload,
  });
}
