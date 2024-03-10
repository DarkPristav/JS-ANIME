const preloader = () => {
  const preloader = document.querySelector('.preloder');

  setTimeout(() => {
    preloader.classList.remove('active');
  }, 500);
};

preloader();
