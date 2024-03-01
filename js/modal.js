const modal = () => {
  const modal = document.querySelector('.search-model');
  const modalBtn = document.querySelector('.icon_search');
  const modalClose = modal.querySelector('.icon_close');
  const input = document.getElementById('search-input');

  modalBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  input.addEventListener('change', () => {
    console.log(input.value);
  });
};

modal();
