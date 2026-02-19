window.addEventListener("load", ()=>{
  document.body.classList.add("loaded");
});

const glow=document.querySelector(".custom-cursor");
document.addEventListener("mousemove", e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

const cards=document.querySelectorAll(".card");
const tiltCards=document.querySelectorAll(".tilt");
const selects=document.querySelectorAll(".card button");
const counters=document.querySelectorAll(".counter");
const testimonials=document.querySelectorAll(".testimonial");

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");}
  });
},{threshold:0.3});
cards.forEach(card=>observer.observe(card));

// Card 3D tilt
tiltCards.forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const rect=card.getBoundingClientRect();
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;
    const centerX=rect.width/2;
    const centerY=rect.height/2;
    const rotateX=(y-centerY)/15;
    const rotateY=(centerX-x)/15;
    card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", ()=>{card.style.transform="rotateX(0) rotateY(0)";});
});

// Testimonials rotation
let current=0;
setInterval(()=>{
  testimonials[current].classList.remove("active");
  current=(current+1)%testimonials.length;
  testimonials[current].classList.add("active");
},3000);
