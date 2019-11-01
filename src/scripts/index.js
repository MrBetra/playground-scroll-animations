import TweenMax, { TimelineMax } from "gsap/TweenMax";
import '../styles/index.scss';

// Recup la liste des jobs
const jobs = document.querySelectorAll('.job');
const intro = document.querySelector('.intro');
const introH2Inner = document.querySelector('.intro h2').innerHTML;
const introH2 = document.querySelector('.intro h2');
let animatedH2;


let introH2Array = [];
let animeLetters;


function decompo() {
  for(let i = 0; i < introH2Inner.length; i++) {
    introH2Array.push(introH2Inner.substr(i, 1));
  }
}


function recompo() {
  // creer container qui contient les div créer plus bas
  animeLetters = document.createElement("h2");
  animeLetters.className = "animated_h2";
  introH2Array.forEach( char => {
    //créer un div et mettre le char dedans :
    //console.log(char);
    let span = document.createElement("span");
    let lettre = document.createTextNode(char);
    char ===  " " ? span.className = "lettre_space" : char;
    // Met la lettre dans le div 
    span.appendChild(lettre);
    // Ajouter la lettre au container
    animeLetters.appendChild(span);
  });

  // Remplace le h2 original par le nouveau décomposer 
  let parentIntro = introH2.parentNode;
  parentIntro.replaceChild(animeLetters, introH2);

  animatedH2 = document.querySelector('.animated_h2');
  //console.log(animatedH2);
}


function addTweenJob(job) {
  let tl = new TimelineMax();
  tl.set(job, { opacity: 0 });
  const io = new IntersectionObserver( (entries, observer) => {
    entries.forEach( entry => {
      if (entry.isIntersecting) {
        tl.to(job, .1, { x: '-20px', scale: 1, opacity: 1, skewX: '1', skewY: '0', ease: Power1.easeOut });
        tl.to(job, .3, { x: '0', scale: 1, opacity: 1, skewX: '0', skewY: '0', ease: Power1.easeInOut });
        //observer.disconnect();
      } else if (entry.intersectionRatio < .5) {
        tl.to(job, .3, { x: '20px', scale: 1, opacity: 1, skewX: '-1', skewY: '0', ease: Power1.easeOut });
        tl.to(job, .4, { x: '0', scale: 1, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeInOut });
        //tl.to(job, .3, { x: '0', scale: .8, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeInOut });
      }
    });
  }, { threshold: 0.5} );
  io.POLL_INTERVAL = 100;
  io.observe(job);
}

function addTweenIntro(el, index) {
  console.log(el, index);
  let tl = new TimelineMax();
  tl.set(el, { opacity: 0 });
  let delay = index < 1 ? 0 : (index / 15) - (index / 13.5);
  const io = new IntersectionObserver( (entries, observer) => {
    entries.forEach( entry => {
      if (entry.isIntersecting) {
        tl.to(el, .3, { x: '-500px', y: '-100px', scale: 1, rotation: 20, opacity: 0, skewX: '1', skewY: '0', ease: Power1.easeOut, delay: delay });
        tl.to(el, .4, { x: '0', y: '0', scale: 1, rotation: 0, opacity: 1, skewX: '0', skewY: '0', ease: Power1.easeInOut, delay: delay });
        observer.disconnect();
      } 
    });
  }, { threshold: 0.5} );
  io.POLL_INTERVAL = 100;
  io.observe(el);
  
  // job.addEventListener('mouseenter', ev => {
    //     tl.to(job, .3, { x: '-60px', scale: .95, skewX: '2', skewY: '0', ease: Power1.easeInOut });
    //     tl.to(job, .3, { x: '-20px', scale: .95, skewX: '-.5', skewY: '0', ease: Power1.easeInOut });
    //     tl.to(job, .2, { x: '-30px', scale: .95, skewX: '0', skewY: '0', ease: Power1.easeInOut });
    // });
    
    // job.addEventListener('mouseleave', ev => {
      //     tl.to(job, .4, { x: '0', scale: 1, skewX: '0', skewY: '0', ease: Power2.easeInOut });
      // });
}
      
function init() {
  decompo();
  recompo();

  jobs.forEach(addTweenJob);
  animatedH2.children.forEach(addTweenIntro);
}
init();