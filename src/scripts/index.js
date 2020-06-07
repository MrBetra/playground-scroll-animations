import TweenMax, { TimelineMax } from "gsap/TweenMax";
import '../styles/index.scss';

const jobs = document.querySelectorAll('.job');
let title = document.querySelector('.animated_h2');
let footer = document.querySelector('.exp__title');




function init() {

  let splitIntroTitle = split(title).children;
  let splitFooterTitle = split(footer).children;

  jobs.forEach(addTweenJob);
  splitIntroTitle.forEach(addTweenIntro);
  splitFooterTitle.forEach(addTweenExp);
  
}
init();

//
//
// Décompose l'element en span individuel et return le nouvel element dom
//
//

function split(element) {

  const elements = [];
  const dom = cloneElement(element.tagName, element.className);

  element.innerHTML.split("").forEach(character => {
    const span = document.createElement("span");
    span.textContent = character;
    if (character == " ") span.className = "lettre_space";
    elements.push(span);
    dom.appendChild(span);
  });

  let parent = element.parentNode;
  parent.replaceChild(dom, element);

  return dom;
}

//
//
// Clone un element dom
//
//

function cloneElement(tag, className) {
  let newElement = document.createElement(tag);
  newElement.className = className;
  return newElement;
}

//
//
// Animation avec intersection observer
//
//

function addTweenJob(job) {
  console.log(job.querySelector('.job__content').children);

  let image = job.querySelector('.job__image');
  let content = job.querySelector('.job__content').children;

  let tl = new TimelineMax();

  tl.set(image, { opacity: 0 });
  tl.set(content, { x: '-20', opacity: 0 });

  const io = new IntersectionObserver( (entries, observer) => {
    entries.forEach( entry => {
      if (entry.isIntersecting) {

        tl.to(job, 0, { opacity: 1 });
        tl.to(image, .25, { x: '-20px', scale: 1, opacity: 1, skewX: '0', skewY: '0', ease: Power1.easeOut });
        tl.staggerTo(content, .25, { stagger: .2, x: '0', scale: 1, opacity: 1, skewX: '1', skewY: '0', ease: Power1.easeOut }, "-=0.25");
        tl.to(image, .25, { x: '0', scale: 1, opacity: 1, skewX: '0', skewY: '0', ease: Power1.easeInOut });
        
        io.disconnect();

      } else if (entry.intersectionRatio < .2) {

        tl.to(image, .2, { x: '-20px', scale: 1, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeOut });
        tl.to(image, 0, { x: '0', scale: 1, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeInOut });

        tl.staggerTo(content, .2, { stagger: .1, x: '20px', scale: 1, opacity: 0, skewX: '-1', skewY: '0', ease: Power1.easeOut });
        
      }
    });
  }, { threshold: 0.2} );

  io.POLL_INTERVAL = 100;
  io.observe(image, content);

}

//
//
// Animation titre
//
//

function addTweenIntro(el, index) {

  let delay = index < 1 ? 0 : (index / 40);
  
  let tl = new TimelineMax();
  tl.set(el, { opacity: 0 });

  const io = new IntersectionObserver( (entries, observer) => {
    entries.forEach( entry => {
      if (entry.isIntersecting) {

        tl.to(el, .3, { x: '15', y: '25', scale: 1, rotation: 10, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeOut });
        tl.to(el, .6, { x: '0', y: '0', scale: 1, rotation: 0, opacity: 1, skewX: '0', skewY: '0', ease: Quad.easeOut, delay: delay * 2 });
      
      } else if (entry.intersectionRatio < .5) {

        tl.to(el, .3, { x: '15', y: '25', scale: 1, rotation: 10, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeOut });
      }
    });
  }, { threshold: 0.5 } );

  io.POLL_INTERVAL = 100;
  io.observe(el);
} 


function addTweenExp(el, index) {

  let delay = index < 1 ? 0 : (index / 40);
  
  let tl = new TimelineMax();
  tl.set(el, { opacity: 0 });

  const io = new IntersectionObserver( (entries, observer) => {
    entries.forEach( entry => {
      if (entry.isIntersecting) {

        tl.to(el, .3, { x: '-15', y: '-50', scale: 1, rotation: -30, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeOut });
        tl.to(el, .6, { x: '0', y: '0', scale: 1, rotation: 0, opacity: 1, skewX: '0', skewY: '0', ease: Bounce.easeOut, delay: delay * 2 });
      
      } else if (entry.intersectionRatio < .5) {

        tl.to(el, .3, { x: '15', y: '25', scale: 1, rotation: 0, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeOut });
      }
    });
  }, { threshold: 0.5 } );

  io.POLL_INTERVAL = 100;
  io.observe(el);
} 