
// Mobile Sidebar Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');

// Open sidebar
if (menuToggle && mobileSidebar) {
  menuToggle.addEventListener('click', () => {
    mobileSidebar.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll when sidebar is open
  });
}

// Close sidebar
function closeSidebar() {
  if (mobileSidebar) {
    mobileSidebar.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
  }
}

if (sidebarClose) {
  sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar when clicking nav items
sidebarNavItems.forEach(item => {
  item.addEventListener('click', () => {
    setTimeout(closeSidebar, 300); // Small delay for smooth transition
  });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close sidebar if open
      closeSidebar();
    }
  });
});

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileSidebar && mobileSidebar.classList.contains('active')) {
    closeSidebar();
  }
});

// Update active state of sidebar nav items based on scroll position
function updateActiveNavItem() {
  const sections = document.querySelectorAll('section[id]');
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item[href^="#"]');
  
  let currentSection = '';
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  sidebarNavItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === `#${currentSection}`) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Update active nav item on scroll
window.addEventListener('scroll', updateActiveNavItem);
updateActiveNavItem(); // Initial call


document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-heart')) {
      icon.classList.remove('fa-heart');
      icon.classList.add('fa-heart', 'fas');
      this.style.color = '#ff4d6d';
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    } else {
      icon.classList.add('fa-heart');
      this.style.color = '';
    }
  });
});


const categoryFilters = document.querySelectorAll('#features .filters .pill');
const categoryCards = document.querySelectorAll('#features .card');

categoryFilters.forEach(filter => {
  filter.addEventListener('click', function() {

    categoryFilters.forEach(f => f.classList.remove('active'));

    this.classList.add('active');
    
    const filterText = this.textContent.trim();
    

    categoryCards.forEach(card => {
      if (filterText === 'All') {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        const cardTitle = card.querySelector('h4').textContent;
        if (cardTitle.toLowerCase().includes(filterText.toLowerCase().split(' ')[0])) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});


const restaurantFilters = document.querySelectorAll('#about .filters .pill');
const restaurantCards = document.querySelectorAll('#about .card');

restaurantFilters.forEach(filter => {
  filter.addEventListener('click', function() {
    restaurantFilters.forEach(f => f.classList.remove('active'));
    this.classList.add('active');
    
    const filterText = this.textContent.trim();
    
    restaurantCards.forEach(card => {
      if (filterText === 'All') {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        const cardContent = card.textContent.toLowerCase();
        const cardTitle = card.querySelector('h4').textContent.toLowerCase();
        
      
        if (filterText === 'Grill and BBQ') {
          if (cardTitle.includes('penong') || cardContent.includes('grill') || cardContent.includes('bbq') || cardContent.includes('barbeque')) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        }
    
        else if (filterText === 'Pork') {
          if (cardTitle.includes('sisig') || cardContent.includes('sisig')) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        }

        else if (filterText === 'Family Dining') {
          if (cardTitle.includes('garden') || cardContent.includes('family') || cardContent.includes('resort')) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

function resetSearch() {
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => {
    card.style.opacity = '';
    card.style.border = '';
  });
}

function performSearch(query) {
  if (!query.trim()) {
    resetSearch();
    return;
  }

  const allCards = document.querySelectorAll('.card');
  let found = false;
  
  allCards.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    if (cardText.includes(query.toLowerCase())) {
      card.style.border = '2px solid var(--orange)';
      card.style.animation = 'pulse 0.5s ease';
      card.style.opacity = '1';
      if (!found) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      found = true;
      setTimeout(() => {
        card.style.border = '';
      }, 2000);
    } else {
      card.style.opacity = '0.3';
    }
  });
  
  if (!found) {
    const message = document.createElement('div');
    message.textContent = `No results found for "${query}"`;
    message.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--orange);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(message);
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 300);
    }, 2000);
    
    setTimeout(() => {
      resetSearch();
    }, 2500);
  }
}

if (searchInput) {
  searchInput.addEventListener('input', function() {
    if (!this.value.trim()) {
      resetSearch();
    }
  });
}

if (searchButton && searchInput) {
  searchButton.addEventListener('click', () => {
    performSearch(searchInput.value);
  });
}

// Sidebar search functionality
const sidebarSearchInput = document.querySelector('.sidebar-search input');
if (sidebarSearchInput) {
  sidebarSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch(sidebarSearchInput.value);
      closeSidebar();
      // Scroll to search results
      const firstSection = document.querySelector('#features');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
  
  sidebarSearchInput.addEventListener('input', function() {
    if (!this.value.trim()) {
      resetSearch();
    }
  });
}

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch(searchInput.value);
  }
});


document.querySelectorAll('.suggested .pill').forEach(pill => {
  pill.addEventListener('click', function() {
    if (this.textContent !== 'More') {
      searchInput.value = this.textContent;
      performSearch(this.textContent);
    }
  });
});

// Scroll animations
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

// Observe all cards and sections
document.querySelectorAll('.card, .feature, .quote, section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Back to top button functionality - always visible in footer
const backToTop = document.querySelector('.back-to-top-btn');
if (backToTop) {
  // Button is always visible in the footer, no need to show/hide
}

// Card click interactions
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Don't trigger if clicking on buttons
    if (!e.target.closest('button')) {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }
  });
});

// Testimonial carousel
const testimonials = document.querySelectorAll('.testimonials .quote');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.opacity = i === index ? '1' : '0.3';
    testimonial.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
  });
}

if (testimonials.length > 0) {
  // Initialize carousel
  testimonials.forEach((testimonial, i) => {
    testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    if (i !== 0) {
      testimonial.style.opacity = '0.3';
      testimonial.style.transform = 'scale(0.95)';
    }
  });

  // Auto-rotate testimonials every 5 seconds
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);

  // Click to navigate
  testimonials.forEach((testimonial, index) => {
    testimonial.addEventListener('click', () => {
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
    });
  });
}

// Add pulse animation for search results
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }
  
  .back-to-top-btn {
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .testimonials .quote {
    cursor: pointer;
  }
`;
document.head.appendChild(style);

// Initialize Restaurant Map
function initRestaurantMap() {
  const mapContainer = document.getElementById('restaurantMap');
  if (!mapContainer) return;

  // Check if Leaflet is loaded
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded');
    return;
  }

  // Center on Davao City, Philippines
  const map = L.map('restaurantMap').setView([7.0731, 125.6128], 13);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  // Restaurant data with coordinates in Davao City
  const restaurants = [
    {
      name: 'Jollibee',
      lat: 7.0731,
      lng: 125.6128,
      address: 'SM City Davao',
      icon: '🍔'
    },
    {
      name: 'Mang Inasal',
      lat: 7.0800,
      lng: 125.6100,
      address: 'Abreeza Mall',
      icon: '🍗'
    },
    {
      name: 'Chowking',
      lat: 7.0750,
      lng: 125.6150,
      address: 'Gaisano Mall',
      icon: '🥟'
    },
    {
      name: 'Burger King',
      lat: 7.0700,
      lng: 125.6080,
      address: 'SM Lanang',
      icon: '🍔'
    },
    {
      name: "McDonald's",
      lat: 7.0720,
      lng: 125.6120,
      address: 'SM City Davao',
      icon: '🍟'
    },
    {
      name: "Penong's Barbeque",
      lat: 7.0680,
      lng: 125.6050,
      address: 'Roxas Avenue',
      icon: '🍖'
    },
    {
      name: 'Sisig Factory',
      lat: 7.0650,
      lng: 125.6000,
      address: 'Matina Town Square',
      icon: '🥓'
    },
    {
      name: 'Garden Bay Restaurant',
      lat: 7.0800,
      lng: 125.6200,
      address: 'Buhangin Road',
      icon: '🌊'
    }
  ];

  // Create custom icon
  const restaurantIcon = L.divIcon({
    className: 'restaurant-marker',
    html: '<div style="background: #ff7a4d; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 3px solid white; cursor: pointer;">🍽️</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

  // Store markers for bounds calculation
  const markers = [];

  // Add markers for each restaurant
  restaurants.forEach(restaurant => {
    const marker = L.marker([restaurant.lat, restaurant.lng], {
      icon: restaurantIcon
    }).addTo(map);

    marker.bindPopup(`
      <div style="text-align: center; padding: 8px;">
        <strong style="color: #ff7a4d; font-size: 16px;">${restaurant.name}</strong><br>
        <span style="color: #6b6b73; font-size: 12px;">${restaurant.address}</span>
      </div>
    `);

    markers.push(marker);
  });

  // Fit map to show all markers after tiles load
  map.whenReady(function() {
    if (markers.length > 0) {
      const group = new L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  });
}

// Initialize map when DOM and Leaflet are loaded
function initializeMapWhenReady() {
  if (typeof L !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initRestaurantMap);
    } else {
      initRestaurantMap();
    }
  } else {
    // Wait a bit and try again if Leaflet isn't loaded yet
    setTimeout(initializeMapWhenReady, 100);
  }
}

initializeMapWhenReady();

