const slider = () => {
    const swiper = new Swiper('.swiper', {
      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      effect: 'cube',
      speed: 1000,
    });
}

slider();



