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

document.querySelectorAll(".feature-card, .plan, .time-card, .beta-price-card").forEach((card) => {
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

// Planos expansíveis: Free, Premium e Patrocinador
const expandablePlans = document.querySelectorAll(".expandable-plans .plan");
const planBackdrop = document.createElement("div");
planBackdrop.className = "plan-popover-backdrop";
planBackdrop.setAttribute("aria-hidden", "true");
document.body.appendChild(planBackdrop);

const closePlanPopup = () => {
  expandablePlans.forEach((item) => {
    item.classList.remove("active", "plan-popup-active");
    item.setAttribute("aria-expanded", "false");
  });

  planBackdrop.classList.remove("show");
  document.body.classList.remove("plan-popover-open");
};

expandablePlans.forEach((plan) => {
  const openPlan = () => {
    const isOpen = plan.classList.contains("plan-popup-active");

    closePlanPopup();

    if (!isOpen) {
      plan.classList.add("active", "plan-popup-active");
      plan.setAttribute("aria-expanded", "true");
      planBackdrop.classList.add("show");
      document.body.classList.add("plan-popover-open");
    }
  };

  plan.addEventListener("click", (event) => {
    event.stopPropagation();
    openPlan();
  });

  plan.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPlan();
    }
  });
});

planBackdrop.addEventListener("click", closePlanPopup);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePlanPopup();
  }
});


// Upgrade Premium RC2: progresso, aura, modais, status e microfunções
const progressBar = document.querySelector(".scroll-progress span");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const cursorAura = document.querySelector(".cursor-aura");
window.addEventListener("pointermove", (event) => {
  if (!cursorAura) return;
  cursorAura.style.left = `${event.clientX}px`;
  cursorAura.style.top = `${event.clientY}px`;
}, { passive: true });

const toast = document.getElementById("toast");
let toastTimer;
const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
};

const copyText = async (text, okMessage = "Copiado") => {
  try {
    await navigator.clipboard.writeText(text);
    showToast(okMessage);
  } catch (error) {
    showToast("Não foi possível copiar automaticamente");
  }
};

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy, "Link copiado"));
});

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.scrollTo);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".price-option").forEach((option) => {
  option.addEventListener("click", (event) => {
    event.stopPropagation();
    const text = `${option.dataset.plan} — ${option.dataset.price}`;
    copyText(text, "Plano copiado: " + text);
  });
});

const modalBackdrop = document.getElementById("modalBackdrop");
const modals = document.querySelectorAll(".premium-modal");
const openModal = (id) => {
  modals.forEach((modal) => modal.classList.remove("show"));
  const modal = document.getElementById(id);
  if (!modal) return;
  modalBackdrop?.classList.add("show");
  modal.classList.add("show");
};
const closeModal = () => {
  modalBackdrop?.classList.remove("show");
  modals.forEach((modal) => modal.classList.remove("show"));
};
document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.openModal));
});
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
modalBackdrop?.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

// Tilt premium leve nos cards de função
if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

const apiStatus = document.getElementById("apiStatus");
const apiStatusCard = document.querySelector('[data-status-card="api"]');
const checkServerBtn = document.getElementById("checkServerBtn");
const checkServer = async () => {
  if (apiStatus) apiStatus.textContent = "Verificando...";
  apiStatusCard?.classList.remove("offline");
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6500);
    const response = await fetch("https://pc-ultra-manager-server.onrender.com/docs", { signal: controller.signal, cache: "no-store" });
    clearTimeout(timer);
    if (response.ok) {
      if (apiStatus) apiStatus.textContent = "Online";
      showToast("Servidor online");
    } else {
      throw new Error("Status " + response.status);
    }
  } catch (error) {
    if (apiStatus) apiStatus.textContent = "Instável";
    apiStatusCard?.classList.add("offline");
    showToast("Servidor instável ou acordando no Render");
  }
};
checkServerBtn?.addEventListener("click", checkServer);
setTimeout(checkServer, 1200);
