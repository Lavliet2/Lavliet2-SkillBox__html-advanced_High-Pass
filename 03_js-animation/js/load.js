document.addEventListener('DOMContentLoaded', () => {
  const heroLeft = document.querySelector('.hero__left');
  const heroDescr = document.querySelector('.hero__descr');
  const photosWrap = document.querySelectorAll('.photos-wrap img');
  const photosAuthor = document.querySelector('.photos__author');
  
  const loadAnimation = gsap.timeline();

  loadAnimation
    .fromTo(heroLeft, 
      { y: '30%', opacity: 0 }, 
      { y: '0%', opacity: 1, duration: 1, ease: 'power3.out' }
    )

    .fromTo(photosWrap, 
      { scale: 0.85, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.6, stagger: 0.3, ease: 'power3.out' },
      "-=0.5"
    )
    .fromTo(heroDescr,
      { opacity: 0},
      { opacity: 1, duration: 3.2, ease: 'power3.out' },
      "-=2.3"
    )

    .fromTo(photosAuthor, 
      { opacity: 0, }, 
      { opacity: 1, duration: 3.2, ease: 'power3.out' },
      "-=2.3"
    );
});
