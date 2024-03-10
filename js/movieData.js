const movieData = () => {
     const preloader = document.querySelector('.preloder');
     const renderGanreList = (ganres) => {
        const dropdownList = document.querySelector('.header__menu .dropdown')

        dropdownList.innerHTML = ''

        ganres.forEach(ganre => {
            dropdownList.insertAdjacentHTML('beforeend', `
                <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)
        })

    }
  
  const renderAnimeDetails = (array, itemID) => {
      const animeObj = array.find(item => item.id == itemID);
      console.log(animeObj);
      if (animeObj) {
          const link = document.querySelector('.breadcrumb__links');
          link.innerHTML = '';
          link.insertAdjacentHTML(
              'beforeend',
              `<a href="./index.html"><i class="fa fa-home"></i>Главная</a>
                <a href="./categories.html?ganre=${animeObj.ganre}">${animeObj.ganre}</a>
                <span>${animeObj.title}</span>
            `);
          const wrapper = document.querySelector('.anime__details__content');
          wrapper.innerHTML = '';
          wrapper.insertAdjacentHTML(
              'beforeend',
              ` <div class="row">
                    <div class="col-lg-3">
                        <div class="anime__details__pic set-bg" data-setbg="${animeObj.image}">
                            <div class="view"><i class="fa fa-eye"></i>${animeObj.views}</div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="anime__details__text">
                            <div class="anime__details__title">
                                <h3>${animeObj.title}</h3>
                                <span>${animeObj['original-title']}</span>
                            </div>
                            <p>${animeObj.description}
                            </p>
                            <div class="anime__details__widget">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <ul>
                                            <li><span>Год выпуска:</span> ${animeObj.date}</li>
                                            <li><span>Рейтинг:</span> ${animeObj.rating}</li>
                                            <li><span>Жанры:</span> ${animeObj.tags.join(" | ")}</li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          `)
          document.querySelectorAll('.set-bg').forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
          });
          setTimeout(() => {
            preloader.classList.remove('active');
            }, 500);
        } else {
          alert('ERROR')
     }

    };
    

  fetch('https://anime-67b23-default-rtdb.firebaseio.com/anime.json')
    .then((response) => response.json())
    .then((data) => {
        const ganres = new Set(); 
        const idParametr = new URLSearchParams(window.location.search).get('itemID')
        data.forEach((item) => {
        ganres.add(item.ganre);
      });
        if (idParametr)
        {
            renderAnimeDetails(data, idParametr);
            
        }
        else
        {
            alert('ERROR')
        }
        renderGanreList(ganres);
    });
}

movieData();