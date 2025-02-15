window.addEventListener('load', function () {
  const splashScreen = document.getElementById('splash-screen');
  const container = document.querySelector('.container');

  // Hide splash screen and show main content after 5 seconds
  setTimeout(() => {
    if (splashScreen) splashScreen.classList.add('fade-out');
    if (container) container.style.opacity = 1;
  }, 5000);

  // Typewriter Effect for Tagline
  const taglineText = "Find. Trace. Return.";
  let index = 0;
  const speed = 100; // Speed in ms
  const taglineElement = document.getElementById("Tagline");

  function typeWriter() {
    if (taglineElement && index < taglineText.length) {
      taglineElement.innerHTML += taglineText.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 80; 
    if (target) {
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

// Hero Section Buttons
const lostBtn = document.querySelector('.btn-report-lost');
const foundBtn = document.querySelector('.btn-report-found');
if (lostBtn) lostBtn.addEventListener('click', () => window.location.href = '/report-lost');
if (foundBtn) foundBtn.addEventListener('click', () => window.location.href = '/report-found');

// Newsletter Subscription
const newsletterBtn = document.querySelector('.newsletter button');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    const emailInput = document.querySelector('.newsletter input[type="email"]');
    const email = emailInput.value.trim();
  
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newsletterBtn.textContent = 'Subscribing...';
      newsletterBtn.disabled = true;
      setTimeout(() => {
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
        newsletterBtn.textContent = 'Subscribe';
        newsletterBtn.disabled = false;
      }, 1000);
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// Mobile Menu Toggle
const header = document.querySelector('header');
if (header) {
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.innerHTML = '☰';
  mobileMenuButton.classList.add('mobile-menu-button');
  mobileMenuButton.setAttribute('aria-label', 'Toggle Navigation');
  mobileMenuButton.setAttribute('aria-expanded', 'false');
  header.appendChild(mobileMenuButton);

  mobileMenuButton.addEventListener('click', () => {
    const nav = document.querySelector('header nav');
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    if (nav) nav.classList.toggle('active');
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  });
}

// Parallax Effect
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
  });
}

// Feature Cards Hover Effect
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
});

// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? 'block' : 'none';
  });
}

const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
  });

  nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  });

  showTestimonial(currentTestimonial);
}

// Dynamic Counter with Intersection Observer
const counters = document.querySelectorAll('.number');

if (counters.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 200;

        function updateCounter() {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCounter, 10);
          } else {
            counter.innerText = target;
          }
        }
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.classList.add('dark-mode-toggle');

if (header) {
  header.appendChild(darkModeToggle);

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

  const style = document.createElement('style');
  style.innerHTML = `
    .dark-mode {
      background-color: #121212;
      color: #ffffff;
    }
    .dark-mode header {
      background-color: #1f1f1f;
    }
    .dark-mode .card, .dark-mode .stat, .dark-mode .item, .dark-mode .faq-item {
      background-color: #2c2c2c;
      color: #ffffff;
    }
  `;
  document.head.appendChild(style);
}

// Contact Form Validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#contact-form input[type="text"]').value.trim();
    const email = document.querySelector('#contact-form input[type="email"]').value.trim();
    const message = document.querySelector('#contact-form textarea').value.trim();

    if (name && email && message) {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    } else {
      alert('Please fill out all fields.');
    }
  });
}
