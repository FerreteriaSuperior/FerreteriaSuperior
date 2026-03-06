// Basic UI interactions shared across pages

document.addEventListener("DOMContentLoaded", () => {
  initHomePreloader();
  handleMobileNav();
  populateYear();
  initHomeBannerSlider();
  initCatalogPage();
  initProductDetailPage();
  initContactForm();
});

function handleMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navActions = document.querySelector(".nav-actions");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    if (navActions) navActions.classList.toggle("open");
  });
}

function populateYear() {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

// Home preloader (solo index)
function initHomePreloader() {
  const preloader = document.getElementById("home-preloader");
  if (!preloader) return;

  window.addEventListener("load", () => {
    // Damos un pequeño tiempo para que se vea la animación
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 800);
  });
}

// Home banner slider (entre header y contenido)
function initHomeBannerSlider() {
  const slider = document.querySelector("[data-home-banner]");
  if (!slider) return;

  const track = slider.querySelector(".home-banner-track");
  const slides = slider.querySelectorAll(".home-banner-slide");
  if (!track || !slides.length) return;

  let index = 0;

  function goToSlide(nextIndex) {
    index = nextIndex;
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  setInterval(() => {
    const next = (index + 1) % slides.length;
    goToSlide(next);
  }, 6000);
}

// Catalog listing page (catalog.html)
function initCatalogPage() {
  const grid = document.querySelector("[data-product-grid]");
  if (!grid || !window.FerreteriaSuperiorCatalog) return;

  const { products } = window.FerreteriaSuperiorCatalog;
  const searchInput = document.querySelector("[data-product-search]");
  const countEl = document.querySelector("[data-product-count]");
  const params = new URLSearchParams(window.location.search);
  const initialCategory =
    params.get("category") || params.get("q") || "";
  const categoryList = document.querySelector("[data-category-list]");

  function renderCards(filterText = "") {
    const term = filterText.trim().toLowerCase();
    grid.innerHTML = "";

    const filtered = products.filter((p) => {
      if (!term) return true;
      const haystack = (
        p.name +
        " " +
        p.category +
        " " +
        p.shortDescription
      ).toLowerCase();
      return haystack.includes(term);
    });

    filtered.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-card-image">
          <img src="${product.image}" alt="${product.name}">
          <span class="product-tag">
            <i class="fa-solid fa-hard-hat"></i>
            ${product.category}
          </span>
        </div>
        <div class="product-card-body">
          <h3 class="product-card-title">${product.name}</h3>
          <p class="product-card-desc">${product.shortDescription}</p>
          <div class="product-card-meta">
            <span class="product-card-price">${
              product.price || "Consultar"
            }</span>
            <a class="product-card-link" href="product.html?id=${encodeURIComponent(
              product.id
            )}">
              Ver detalles
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    if (countEl) {
      countEl.textContent = `${filtered.length} producto${
        filtered.length === 1 ? "" : "s"
      }`;
    }
  }

  if (initialCategory && searchInput) {
    searchInput.value = initialCategory;
    renderCards(initialCategory);
  } else {
    renderCards();
  }

  if (categoryList) {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b, "es"));

    categoryList.innerHTML = `
      <button type="button" class="product-category-link" data-category-filter="">
        Todas las categorías
      </button>
      ${uniqueCategories
        .map(
          (cat) => `
            <button type="button" class="product-category-link" data-category-filter="${escapeHtml(
              cat
            )}">
              ${escapeHtml(cat)}
            </button>
          `
        )
        .join("")}
    `;

    const categoryButtons = categoryList.querySelectorAll("[data-category-filter]");
    function setActiveCategory(value) {
      const normalized = (value || "").toLowerCase();
      categoryButtons.forEach((b) => b.classList.remove("active"));
      const match =
        Array.from(categoryButtons).find(
          (b) =>
            (b.getAttribute("data-category-filter") || "").toLowerCase() ===
            normalized
        ) || categoryButtons[0];
      match.classList.add("active");
    }

    setActiveCategory(initialCategory);

    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category-filter") || "";
        setActiveCategory(category);
        if (searchInput) searchInput.value = category;
        renderCards(category);
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderCards(e.target.value);
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Product detail page (product.html)
function initProductDetailPage() {
  if (!window.FerreteriaSuperiorCatalog) return;

  const container = document.querySelector("[data-product-detail]");
  if (!container) return;

  const { products, buildWhatsAppUrl } = window.FerreteriaSuperiorCatalog;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const product = products.find((p) => p.id === id) || products[0];

  const titleEls = document.querySelectorAll("[data-product-title]");
  const categoryEl = document.querySelector("[data-product-category]");
  const priceEl = document.querySelector("[data-product-price]");
  const descEl = document.querySelector("[data-product-description]");
  const imageEl = document.querySelector("[data-product-image]");
  const specsEl = document.querySelector("[data-product-specs]");
  const whatsappBtn = document.querySelector("[data-product-whatsapp]");

  if (titleEls.length) {
    titleEls.forEach((el) => {
      el.textContent = product.name;
    });
  }
  if (categoryEl) categoryEl.textContent = product.category;
  if (priceEl)
    priceEl.innerHTML = `${product.price || "Consultar"}<span>Precio de referencia, sujeto a existencia.</span>`;
  if (descEl) descEl.textContent = product.description;
  if (imageEl) {
    imageEl.src = product.image;
    imageEl.alt = product.name;
  }
  if (specsEl && Array.isArray(product.specs)) {
    specsEl.innerHTML = "";
    product.specs.forEach((spec) => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${spec}</span>`;
      specsEl.appendChild(li);
    });
  }
  if (whatsappBtn) {
    const msg = `Hola, me gustaría recibir información sobre el producto: ${product.name}`;
    whatsappBtn.href = buildWhatsAppUrl(msg);
  }
}

// Simple contact form handling (no backend submission)
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form || !window.FerreteriaSuperiorCatalog) return;

  const { buildWhatsAppUrl } = window.FerreteriaSuperiorCatalog;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const message = formData.get("message") || "";

    const composed = `Hola, soy ${name || "un cliente"}. Teléfono: ${
      phone || "no proporcionado"
    }.\n\nMensaje:\n${message}`;

    const url = buildWhatsAppUrl(composed);
    window.open(url, "_blank");
  });
}

function scrollProducts(direction) {

  const slider = document.getElementById("productSlider");
  
  const scrollAmount = 300;
  
  slider.scrollBy({
  left: direction * scrollAmount,
  behavior: "smooth"
  });
  
  }
