window.addEventListener("load", ()=>{
  document.body.classList.add("loaded");
});

const cursor=document.querySelector(".custom-cursor");
document.addEventListener("mousemove", e=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

const cards=document.querySelectorAll(".card");
const tiltCards=document.querySelectorAll(".tilt");
const customCard=document.querySelector('.custom-card');
const calculator=document.getElementById('calculator');

// Reveal cards on scroll
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");}
  });
},{threshold:0.3});
cards.forEach(card=>observer.observe(card));

// Tilt effect
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

// Show calculator on custom card click
customCard.addEventListener('click', ()=>{
  calculator.style.display = calculator.style.display==='block' ? 'none' : 'block';
  calculator.scrollIntoView({behavior:'smooth'});
});

// Calculator logic
const pagesInput = document.getElementById('pages');
const animatedUI = document.getElementById('animatedUI');
const seo = document.getElementById('seo');
const extras = document.getElementById('extras');
const totalPrice = document.getElementById('totalPrice');

function calculatePrice(){
  let price = pagesInput.value*10; // £10 per page
  price += parseInt(animatedUI.value);
  price += parseInt(seo.value);
  price += parseInt(extras.value);
  totalPrice.textContent = price;
}

[pagesInput, animatedUI, seo, extras].forEach(el=>el.addEventListener('input', calculatePrice));
calculatePrice(); // initial display
