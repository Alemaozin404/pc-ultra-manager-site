window.addEventListener("load", () => {
  setTimeout(() => document.body.classList.add("loaded"), 650);
});

const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.13 });

reveals.forEach((el) => io.observe(el));

document.querySelectorAll(".feature-card, .plan, .time-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px) translateY(-3px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

const title = document.querySelector("h1");
if (title) {
  title.innerHTML = title.textContent
    .split(" ")
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");

  const words = document.querySelectorAll(".word");
  words.forEach((word, index) => {
    word.style.display = "inline-block";
    word.style.opacity = "0";
    word.style.transform = "translateY(28px)";
    word.style.transition = `opacity .7s ease ${index * 0.045}s, transform .7s ease ${index * 0.045}s`;
  });

  setTimeout(() => {
    words.forEach((word) => {
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
    });
  }, 760);
}
