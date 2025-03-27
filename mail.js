document.addEventListener('DOMContentLoaded', function () {
  const firstSlider = document.querySelectorAll('.swiper-slide');
  const prevSlideBtn = document.querySelector('.swiper-button_prev');
  const nextSlideBtn = document.querySelector('.swiper-button_next');

  const focusSlidePrev = document.querySelector('.focus-button_prev');
  const focusSlideNext = document.querySelector('.focus-button_next');
  const focusSlides = document.querySelectorAll('.focus-slider__slide');

  const header = document.querySelector('.header');
  const mobileMenu = header.querySelector('.nav-menu_header');
  const burgerMenu = header.querySelector('.burger-menu');
  const navBtns = header.querySelectorAll('.nav-menu__link');

  const sections = document.querySelectorAll('[data-section]');

  const indexActiveSlide = {
    firstSlider: 1,
    secondSlider: 1,
  };

  const showSlide = (slides, typeSlider, way) => {
    if (way === 'next') {
      indexActiveSlide[typeSlider] += 1;
    }

    if (way === 'prev') {
      indexActiveSlide[typeSlider] -= 1;
    }

    if (indexActiveSlide[typeSlider] === slides.length) {
      indexActiveSlide[typeSlider] = 0;
    }

    if (indexActiveSlide[typeSlider] < 0) {
      indexActiveSlide[typeSlider] = slides.length - 1;
    }

    slides.forEach((slide) =>
      slide.classList.remove('active', 'slide_left', 'slide_right')
    );

    slides[indexActiveSlide[typeSlider]].classList.add('active');

    switch (indexActiveSlide[typeSlider]) {
      case 1:
        slides[0].classList.add('slide_left');
        slides[2].classList.add('slide_right');
        break;
      case 2:
        slides[1].classList.add('slide_left');
        slides[0].classList.add('slide_right');
        break;
      default:
        slides[2].classList.add('slide_left');
        slides[1].classList.add('slide_right');
    }
  };

  const toggleMobileMenu = () => {
    burgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('lock');
  };

  // menu
  burgerMenu.addEventListener('click', toggleMobileMenu);

  // click to nav batton
  navBtns.forEach((btn) => btn.addEventListener('click', toggleMobileMenu));

  // sliders
  prevSlideBtn.addEventListener('click', () =>
    showSlide(firstSlider, 'firstSlider', 'prev')
  );
  nextSlideBtn.addEventListener('click', () =>
    showSlide(firstSlider, 'firstSlider', 'next')
  );

  focusSlidePrev.addEventListener('click', () =>
    showSlide(focusSlides, 'secondSlider', 'prev')
  );
  focusSlideNext.addEventListener('click', () =>
    showSlide(focusSlides, 'secondSlider', 'next')
  );

  // header scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  // scroll to sections

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section');
        const button = document.querySelector(`[data-link="${sectionId}"]`);

        if (entry.isIntersecting) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    },
    {
      rootMargin: '-100px 0px -80%',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});
