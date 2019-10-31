import TweenMax, { TimelineMax } from "gsap/TweenMax";
import '../styles/index.scss';

// Recup la liste des jobs
const jobs = document.querySelectorAll('.job');

function init() {
    // Ajout le Tween sur qchaques jobs
    jobs.forEach(addTweenJob);
}

function addTweenJob(job) {
    let tl = new TimelineMax();
    tl.set(job, { opacity: 0 });
    const io = new IntersectionObserver( (entries, observer) => {
        entries.forEach( entry => {
            if (entry.isIntersecting) {

                tl.to(job, .3, { x: '-60px', scale: 1, opacity: 1, skewX: '2', skewY: '0', ease: Power1.easeOut });
                tl.to(job, .4, { x: '0', scale: 1, opacity: 1, skewX: '0', skewY: '0', ease: Power1.easeInOut });
                
                //observer.disconnect();
            } else if (entry.intersectionRatio < .5) {
                tl.to(job, .3, { x: '0', scale: .8, opacity: 0, skewX: '0', skewY: '0', ease: Power1.easeInOut });
            }
        });
    }, { threshold: 0.3} );
    io.POLL_INTERVAL = 0;
    io.observe(job);

    // job.addEventListener('mouseenter', ev => {
    //     tl.to(job, .3, { x: '-60px', scale: .95, skewX: '2', skewY: '0', ease: Power1.easeInOut });
    //     tl.to(job, .3, { x: '-20px', scale: .95, skewX: '-.5', skewY: '0', ease: Power1.easeInOut });
    //     tl.to(job, .2, { x: '-30px', scale: .95, skewX: '0', skewY: '0', ease: Power1.easeInOut });
    // });
    
    // job.addEventListener('mouseleave', ev => {
    //     tl.to(job, .4, { x: '0', scale: 1, skewX: '0', skewY: '0', ease: Power2.easeInOut });
    // });
}
init();