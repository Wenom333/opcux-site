/* ==========================
   OPCUX V2
   STARS + CURSOR + ANIMATIONS
========================== */

const starsContainer = document.getElementById("stars");
const cursorGlow = document.getElementById("cursor-glow");

/* ==========================
   CURSOR GLOW
========================== */

document.addEventListener("mousemove", (e) => {

    cursorGlow.style.left = e.clientX + "px";

    cursorGlow.style.top = e.clientY + "px";

});

/* ==========================
   CANVAS
========================== */

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");

starsContainer.appendChild(canvas);

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* ==========================
   STARS
========================== */

const stars = [];

const STAR_COUNT = 180;

for(let i=0;i<STAR_COUNT;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*1.8+0.4,

        speed:Math.random()*0.25+0.05,

        alpha:Math.random()*0.8+0.2

    });

}

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(const star of stars){

        star.y += star.speed;

        if(star.y > canvas.height){

            star.y = -5;

            star.x = Math.random()*canvas.width;

        }

        ctx.beginPath();

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fillStyle=`rgba(255,255,255,${star.alpha})`;

        ctx.fill();

    }

    requestAnimationFrame(drawStars);

}

drawStars();
/* ==========================
   SHOOTING STARS
========================== */

const shootingStars = [];

function createShootingStar(){

    shootingStars.push({

        x:Math.random()*canvas.width,

        y:-100,

        vx:-(Math.random()*5+4),

        vy:(Math.random()*5+4),

        length:Math.random()*120+80,

        life:0,

        maxLife:120

    });

}

setInterval(()=>{

    if(Math.random()<0.65){

        createShootingStar();

    }

},3500);


/* ==========================
   UPDATE SHOOTING STARS
========================== */

function updateShootingStars(){

    for(let i=shootingStars.length-1;i>=0;i--){

        const s=shootingStars[i];

        s.x+=s.vx;

        s.y+=s.vy;

        s.life++;

        const g=ctx.createLinearGradient(

            s.x,

            s.y,

            s.x+s.length,

            s.y-s.length

        );

        g.addColorStop(0,"rgba(255,255,255,0)");

        g.addColorStop(.4,"rgba(255,255,255,.2)");

        g.addColorStop(1,"rgba(255,255,255,.95)");

        ctx.beginPath();

        ctx.strokeStyle=g;

        ctx.lineWidth=2;

        ctx.moveTo(s.x,s.y);

        ctx.lineTo(

            s.x+s.length,

            s.y-s.length

        );

        ctx.stroke();

        if(s.life>s.maxLife){

            shootingStars.splice(i,1);

        }

    }

}


/* ==========================
   OVERRIDE DRAW
========================== */

const oldDraw=drawStars;

function drawStars(){

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    for(const star of stars){

        star.y+=star.speed;

        if(star.y>canvas.height){

            star.y=-5;

            star.x=Math.random()*canvas.width;

        }

        star.alpha+=

            (Math.random()-.5)*0.02;

        star.alpha=Math.max(

            .15,

            Math.min(

                .95,

                star.alpha

            )

        );

        ctx.beginPath();

        ctx.arc(

            star.x,

            star.y,

            star.r,

            0,

            Math.PI*2

        );

        ctx.fillStyle=

        `rgba(255,255,255,${star.alpha})`;

        ctx.fill();

    }

    updateShootingStars();

    requestAnimationFrame(drawStars);

}

drawStars();


/* ==========================
   CURSOR SCALE
========================== */

document.addEventListener(

"mousedown",

()=>{

cursorGlow.style.transform=

"translate(-50%,-50%) scale(1.6)";

}

);

document.addEventListener(

"mouseup",

()=>{

cursorGlow.style.transform=

"translate(-50%,-50%) scale(1)";

}

);


/* ==========================
   REVEAL ANIMATION
========================== */

const observer=

new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

document

.querySelectorAll(

".card,.stat,.contact-item,.payment-card,.hero"

)

.forEach(el=>{

el.classList.add("fade-up");

observer.observe(el);

});
