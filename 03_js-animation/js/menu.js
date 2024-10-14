const burger = document.querySelector('.burger');
const closeMenu = document.querySelector('.close');
const menu = document.querySelector('.menu');
const menuTop = document.querySelector('.menu__top');
const menuContainer = document.querySelector('.menu__container');
const social = document.querySelector('.social');
const menuRight = document.querySelector('.menu__right');


const menuAnimation = gsap.timeline({ paused: true });


menuAnimation
  .set(menu, { display: 'block' })
  .fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.8 }) 
  .fromTo(menuTop, { y: '-100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.5, ease: 'expo.inOut ' }, "-=0.5") 
  .fromTo(menuContainer, { y: '8%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1, ease: 'expo.inOut ' }, "-=0.3") 
  .fromTo([social, menuRight], { y: '8%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.8, ease: 'expo.inOut' }, "-=0.8");

burger.addEventListener('click', () => {
  menuAnimation.play(); 
  burger.style.display = 'none';
  closeMenu.style.display = 'block';
});

closeMenu.addEventListener('click', () => {
  menuAnimation.reverse();
  setTimeout(() => {
    burger.style.display = 'block';
    closeMenu.style.display = 'none';
  }, 1000);
});
