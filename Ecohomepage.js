// JAVASCRIPT FILE ONLY
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle mobile menu when clicking the hamburger button
  mobileMenuButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('show');
  });

  // Close mobile menu if user clicks outside
  document.addEventListener('click', function (event) {
    if (
      !mobileMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      mobileMenu.classList.remove('show');
    }
});
// Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu after clicking
        mobileMenu.classList.remove('show');
      }
    });
  });
  
  // Number counting animation
  function animateCounter(element, target, duration) {
    const start = 0;
    const increment = Math.ceil(target / (duration / 16));
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = current.toLocaleString();
      }
    }, 16);
  }
  
  // Intersection Observer for counting animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = document.querySelectorAll('.counting-number');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, target, 2000);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  // Observe the stats section
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
  
  // Program card hover effects
  const programCards = document.querySelectorAll('.program-card');
  programCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-0.5rem)';
      card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Team card hover effects
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.02)';
      card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (button.classList.contains('white-btn')) {
        button.style.backgroundColor = '#f3f4f6';
      } else if (button.classList.contains('outline-btn')) {
        button.style.backgroundColor = 'white';
        button.style.color = '#124559';
      } else if (button.classList.contains('apply-btn')) {
        button.style.backgroundColor = ' #1b6380';
      }
    });
    
    button.addEventListener('mouseleave', () => {
      if (button.classList.contains('white-btn')) {
        button.style.backgroundColor = 'white';
      } else if (button.classList.contains('outline-btn')) {
        button.style.backgroundColor = 'transparent';
        button.style.color = 'white';
      } else if (button.classList.contains('apply-btn')) {
        button.style.backgroundColor = '#3f7285ff';
      }
    });
  });
  
  // Navigation link hover effects
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.color = '#3f7285ff';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.color = '#374151';
    });
  });

  const profileCircle = document.querySelector(".profile-circle");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser "));
  
  if (loggedInUser) {
    const initials = loggedInUser.fullname
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
    profileCircle.textContent = initials;
    profileCircle.href = "#"; 
    profileCircle.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser ");
      alert("Logged out!");
      window.location.reload();
    });
  } else {
    profileCircle.innerHTML = '<i class="fas fa-user"></i>';
    profileCircle.href = "login.html"; 
  }
});



