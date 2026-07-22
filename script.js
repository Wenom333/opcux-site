// Плавое появление элементов
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll("header, .card, .payment").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// Параллакс фона
document.addEventListener("mousemove", (e) => {
    const bg = document.querySelector(".background");

    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    bg.style.transform = `translate(${x}px, ${y}px)`;
});

// Подсветка карточек
document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background =
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(124,58,237,.25),
        rgba(255,255,255,.05) 60%)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background =
        "rgba(255,255,255,.05)";

    });

});
