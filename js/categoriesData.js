const categoriesData = () => {
     const renderGanreList = (ganres) => {
        const dropdownList = document.querySelector('.header__menu .dropdown')

        dropdownList.innerHTML = ''

        ganres.forEach(ganre => {
            dropdownList.insertAdjacentHTML('beforeend', `
                <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)
        })

    }
    
  
  
  
  const renderAnimeList = (array, ganres) => {
      const wrapper = document.querySelector('.product__list');
       const preloader = document.querySelector('.preloder');

    wrapper.innerHTML = '';

    ganres.forEach((ganre) => {
      const productBlock = document.createElement('div');
        const listBlock = document.createElement('div');
        


      listBlock.classList.add('row');
      productBlock.classList.add('mb-5');

      const list = array.filter((item) => item.tags.includes(ganre));
        const ganreTag = new URLSearchParams(window.location.search).get('ganre')
        if (ganreTag) {
            productBlock.insertAdjacentHTML(
                'beforeend',
                `
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                        <h4>${ganre}</h4>
                    </div>
                </div>
            </div>
        `,
            );
        } else {
            productBlock.insertAdjacentHTML(
                'beforeend',
                `
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                        <h4>${ganre}</h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="btn__all">
                        <a href="/categories.html?ganre=${ganre}" class="primary-btn">Смотреть все <span class="arrow_right"></span></a>
                    </div>
                    </div>
            </div>
        `,
      );
      }
        

      list.forEach((item) => {
        const tagList = document.createElement('ul');

        item.tags.forEach((tag) => {
          tagList.insertAdjacentHTML(
            'beforeend',
            `
                  <li>${tag}</li>
                  `,
          );
        });

        listBlock.insertAdjacentHTML(
          'beforeend',
            `
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" data-setbg="${item.image}">
                            <div class="ep">${item.rating} / 10 </div>
                            <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
                        </div>
                        <div class="product__item__text">
                            ${tagList.outerHTML}
                            <h5><a href="/anime-details.html?itemID=${item.id}">${item.title}</a></h5>
                        </div>
                    </div>
                </div>
            `,
        );
      });
      productBlock.append(listBlock);
      wrapper.append(productBlock);
      document.querySelectorAll('.set-bg').forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
      });
    });
    setTimeout(() => {
    preloader.classList.remove('active');
  }, 500);
  };

  const renderTopViews = (array) => {
    const wrapper = document.querySelector('.filter__gallery');
    wrapper.innerHTML = '';
    array.forEach((item) => {
      wrapper.insertAdjacentHTML(
        'beforeend',
        `
            <div class="product__sidebar__view__item set-bg mix"
                data-setbg="${item.image}">
                <div class="ep">${item.rating} / 10</div>
                <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
                <h5><a href="/anime-details.html">${item.title}</a></h5>
            </div>
            `,
      );
    });
    document.querySelectorAll('.set-bg').forEach((elem) => {
      elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
    });
  };

  fetch('https://anime-67b23-default-rtdb.firebaseio.com/anime.json')
    .then((response) => response.json())
    .then((data) => {
        const ganres = new Set(); 
        const ganreParametr = new URLSearchParams(window.location.search).get('ganre')
        data.forEach((item) => {
        ganres.add(item.ganre);
      });
        renderTopViews(data.sort((a, b) => b.views - a.views).slice(0, 5));
        if (ganreParametr)
        {
            renderAnimeList(data, [ganreParametr]);
            
        }
        else
        {
            renderAnimeList(data, ganres)
        }
        renderGanreList(ganres);
    });
}

categoriesData();