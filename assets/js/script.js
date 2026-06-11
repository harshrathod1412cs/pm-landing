/* ============================================================
   MAIN JS — Header + Hero Slider
   ============================================================ */
"use strict";

/* ---- Burger / Mobile Nav ---- */
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

if (burger && mobileNav) {
  burger.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    const spans = burger.querySelectorAll("span");
    if (open) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      spans.forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    }
  });

  // Close on link click
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      burger.querySelectorAll("span").forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    });
  });
}

/* ---- Hero Swiper ---- */
const heroSwiper = new Swiper(".heroSwiper", {
  slidesPerView: 1.05,
  centeredSlides: true,
  loop: true,
  speed: 700,
  effect: "slide",

  keyboard: {
    enabled: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  breakpoints: {
    // Mobile
    320: {
      slidesPerView: 1.05,
      spaceBetween: -80,
    },

    // Large Mobile
    480: {
      slidesPerView: 1.1,
      spaceBetween: -120,
    },

    // Tablet
    768: {
      slidesPerView: 1.2,
      spaceBetween: -250,
    },

    // Small Laptop
    1024: {
      slidesPerView: 1.35,
      spaceBetween: -300,
    },

    // Desktop
    1280: {
      slidesPerView: 1.45,
    },

    // Large Desktop
    1440: {
      slidesPerView: 1.5,
      spaceBetween: -650,
    },
  },
});

/* ---- Section JS added here as sections are built ---- */

/* ============================================================
   TESTIMONIALS SWIPER 
   ============================================================ */

const testiSwiper = new Swiper(".testiSwiper", {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 0,

  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  speed: 600,

  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },

  pagination: {
    el: ".testiSwiper-pagination",
    clickable: true,
  },

  keyboard: {
    enabled: true,
  },

  a11y: {
    enabled: true,
    prevSlideMessage: "Previous testimonial",
    nextSlideMessage: "Next testimonial",
  },
});

/* ============================================================
   FAQ ACCORDION 
   ============================================================ */

(function () {
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const isOpen = item.classList.contains("faq__item--open");

      /* Close all items */
      faqItems.forEach(function (i) {
        i.classList.remove("faq__item--open");
      });

      /* If it wasn't open, open it now */
      if (!isOpen) {
        item.classList.add("faq__item--open");
      }
    });
  });
})();

/* ============================================================
   CTA FORM VALIDATION
   ============================================================ */

(function () {
  const form = document.getElementById("ctaForm");
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById("ctaName"),
      err: document.getElementById("ctaNameErr"),
      rule: "required",
      label: "Name",
    },
    email: {
      el: document.getElementById("ctaEmail"),
      err: document.getElementById("ctaEmailErr"),
      rule: "email",
      label: "Email",
    },
    company: {
      el: document.getElementById("ctaCompany"),
      err: document.getElementById("ctaCompanyErr"),
      rule: "required",
      label: "Company Name",
    },
    website: {
      el: document.getElementById("ctaWebsite"),
      err: document.getElementById("ctaWebsiteErr"),
      rule: "optional",
      label: "Website Url",
    },
    date: {
      el: document.getElementById("ctaDate"),
      err: document.getElementById("ctaDateErr"),
      rule: "required",
      label: "Date",
    },
    slot: {
      el: document.getElementById("ctaSlot"),
      err: document.getElementById("ctaSlotErr"),
      rule: "required",
      label: "Time Slot",
    },
    message: {
      el: document.getElementById("ctaMessage"),
      err: document.getElementById("ctaMessageErr"),
      rule: "optional",
      label: "Message",
    },
  };

  const successEl = document.getElementById("ctaSuccess");

  /* ---- Validate single field ---- */
  function validateField(key) {
    const { el, err, rule, label } = fields[key];
    const val = el.value.trim();

    // Clear previous
    err.textContent = "";
    el.classList.remove("cta__input--error");

    if (rule === "required" && !val) {
      err.textContent = label + " is required.";
      el.classList.add("cta__input--error");
      return false;
    }

    if (rule === "email") {
      if (!val) {
        err.textContent = "Email is required.";
        el.classList.add("cta__input--error");
        return false;
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val)) {
        err.textContent = "Please enter a valid email address.";
        el.classList.add("cta__input--error");
        return false;
      }
    }

    if (rule === "optional" && key === "website" && val) {
      // Optional but if filled must be valid URL pattern
      const urlRe = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
      if (!urlRe.test(val)) {
        err.textContent = "Please enter a valid URL.";
        el.classList.add("cta__input--error");
        return false;
      }
    }

    return true;
  }

  /* ---- Live validation on blur ---- */
  Object.keys(fields).forEach(function (key) {
    fields[key].el.addEventListener("blur", function () {
      validateField(key);
    });

    /* Clear error on input */
    fields[key].el.addEventListener("input", function () {
      fields[key].err.textContent = "";
      fields[key].el.classList.remove("cta__input--error");
    });
  });

  /* ---- Submit ---- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let allValid = true;

    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) {
        allValid = false;
      }
    });

    if (!allValid) return;

    /* All valid — show success message */
    const submitBtn = form.querySelector(".cta__submit");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    /* Simulate async submit */
    setTimeout(function () {
      submitBtn.style.display = "none";
      successEl.classList.add("cta__success--visible");

      /* Reset form after 4 seconds */
      setTimeout(function () {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "";
        submitBtn.innerHTML =
          'Book my demo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17.92 11.62C17.8724 11.4973 17.801 11.3851 17.71 11.29L12.71 6.29C12.6168 6.19676 12.5061 6.1228 12.3842 6.07234C12.2624 6.02188 12.1319 5.99591 12 5.99591C11.7337 5.99591 11.4783 6.1017 11.29 6.29C11.1968 6.38324 11.1228 6.49393 11.0723 6.61575C11.0219 6.73758 10.9959 6.86814 10.9959 7C10.9959 7.2663 11.1017 7.5217 11.29 7.71L14.59 11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H14.59L11.29 16.29C11.1963 16.383 11.1219 16.4936 11.0711 16.6154C11.0203 16.7373 10.9942 16.868 10.9942 17C10.9942 17.132 11.0203 17.2627 11.0711 17.3846C11.1219 17.5064 11.1963 17.617 11.29 17.71C11.383 17.8037 11.4936 17.8781 11.6154 17.9289C11.7373 17.9797 11.868 18.0058 12 18.0058C12.132 18.0058 12.2627 17.9797 12.3846 17.9289C12.5064 17.8781 12.617 17.8037 12.71 17.71L17.71 12.71C17.801 12.6149 17.8724 12.5028 17.92 12.38C18.02 12.1365 18.02 11.8635 17.92 11.62Z" fill="white"></path>';
        submitBtn.style.display = "flex";
        successEl.classList.remove("cta__success--visible");
      }, 4000);
    }, 800);
  });
})();

/* ============================================================
   SMARTER WAY 
   ============================================================ */

/* ── 1. Init Swiper ── */
const smarterSwiper = new Swiper(".smarterSwiper", {
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  speed: 480,
  effect: "slide",
  allowTouchMove: false,
  keyboard: {
    enabled: true,
  },

  breakpoints: {
    // Mobile
    320: {
      slidesPerView: 1.1,
      spaceBetween: -20,
    },

    // Large Mobile
    480: {
      slidesPerView: 1.3,
      spaceBetween: -40,
    },

    // Tablet
    640: {
      slidesPerView: 1.45,
      spaceBetween: -60,
    },

    // Tablet Landscape
    768: {
      slidesPerView: 1.55,
      spaceBetween: -80,
    },

    // Laptop
    1024: {
      slidesPerView: 1.65,
      spaceBetween: -100,
    },

    // Desktop
    1280: {
      slidesPerView: 1.7,
      spaceBetween: -120,
    },

    // Large Desktop
    1440: {
      slidesPerView: 1.8,
      spaceBetween: -120,
    },
  },
});

/* ── 2. Accordion + Slider sync ── */
(function () {
  const accItems = document.querySelectorAll(".smarter__acc-item");
  if (!accItems.length || !smarterSwiper) return;

  function activate(index) {
    /* Update all accordion items */
    accItems.forEach(function (item, i) {
      item.classList.toggle("smarter__acc-item--active", i === index);
    });
    /* Slide to matching card */
    smarterSwiper.slideTo(index, 480);
  }

  /* Click on accordion item */
  accItems.forEach(function (item) {
    item.addEventListener("click", function () {
      activate(parseInt(item.getAttribute("data-index"), 10));
    });
  });

  /* Swipe slider → sync accordion */
  smarterSwiper.on("slideChange", function () {
    accItems.forEach(function (item, i) {
      item.classList.toggle(
        "smarter__acc-item--active",
        i === smarterSwiper.activeIndex,
      );
    });
  });

  /* Init */
  activate(0);
})();
