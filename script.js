// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Header background on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(13, 17, 23, 0.98)';
  } else {
    header.style.background = 'rgba(13, 17, 23, 0.9)';
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.feature-card, .game-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `all 0.5s ease ${i * 0.1}s`;
  observer.observe(el);
});

// Animate stats counter
const stats = document.querySelectorAll('.stat-value');
const animateStats = () => {
  stats.forEach(stat => {
    const target = stat.textContent;
    const isPlus = target.includes('+');
    const num = parseInt(target);
    let current = 0;
    const increment = num / 30;
    
    const updateCounter = () => {
      current += increment;
      if (current < num) {
        stat.textContent = Math.ceil(current) + (isPlus ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };
    
    updateCounter();
  });
};

// Trigger stats animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateStats();
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });

heroObserver.observe(document.querySelector('.hero'));
