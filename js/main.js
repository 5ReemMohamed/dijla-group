document.addEventListener('DOMContentLoaded', function () {

  const counters = document.querySelectorAll(".stat h3");
  const statsSection = document.getElementById("heroStats");
  let hasCounted = false;

  function animateCounter(counter, target, suffix, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);

      counter.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function startCountersOnce() {
    if (hasCounted) return;

    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const suffix = counter.dataset.suffix || "";
      animateCounter(counter, target, suffix, 5000);
    });

    hasCounted = true;
  }

  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        startCountersOnce();
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: false
    });
  }

  document.querySelectorAll('.dropdown-submenu > a').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const submenu = this.nextElementSibling;
      submenu.classList.toggle('show');
    });
  });

  document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.getElementById('navbarNav');

      if (!navbarCollapse) return;

      const bsCollapse =
        bootstrap.Collapse.getInstance(navbarCollapse) ||
        new bootstrap.Collapse(navbarCollapse);

      bsCollapse.hide();
    });
  });

});
