document.addEventListener('DOMContentLoaded', function () {
    var heroCarousel = document.querySelector('#heroCarousel');

    new bootstrap.Carousel(heroCarousel, {
        interval: 4000,   
        pause: false,   
        ride: 'carousel',
        wrap: true,
        touch: true
    });

    const counters = document.querySelectorAll(".counter");

    const runCounter = (counter) => {
        counter.innerText = "0";
        const target = +counter.dataset.target;
        const suffix = counter.dataset.suffix || "";
        let count = 0;
        const speed = target / 100;

        const update = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count) + suffix;
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + suffix;
            }
        };
        update();
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(counter => observer.observe(counter));
    AOS.init({
        duration: 1000,
        once: false
    });
});
