document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PAGE ENTRANCE TRANSITION (WIPE EXIT)
    // ==========================================
    const wipe = document.querySelector('.page-transition-wipe');
    if (wipe) {
        // Mark wipe as exiting
        wipe.classList.add('exit');
        setTimeout(() => {
            wipe.style.display = 'none';
        }, 600); // Matches transition duration in CSS
    }

    // ==========================================
    // 2. MOBILE RESPONSIVE HAMBURGER NAVIGATION
    // ==========================================
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');
        };

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.onclick = () => {
                menuIcon.classList.remove('fa-xmark');
                navbar.classList.remove('active');
            };
        });
    }

    // ==========================================
    // 3. HEADER SCROLL AND SCROLL-SPY ACTIVE NAV
    // ==========================================
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Toggle header scrolled class for shadow/background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Spy link highlighter (only run if sections exist on the page)
        if (sections.length > 0) {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `index.html#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ==========================================
    // 4. CHAR-BY-CHAR SPLIT REVEAL ANIMATIONS
    // ==========================================
    const splitTextElements = document.querySelectorAll('.split-text');
    splitTextElements.forEach(el => {
        const text = el.textContent.trim();
        el.textContent = '';
        
        const words = text.split(' ');
        words.forEach(word => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('split-word');
            
            const chars = word.split('');
            chars.forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.classList.add('split-char');
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
            });
            
            el.appendChild(wordSpan);
            // Append space character after word
            el.appendChild(document.createTextNode(' '));
        });
    });

    // Trigger reveal of split characters on load
    setTimeout(() => {
        const allChars = document.querySelectorAll('.split-char');
        allChars.forEach((char, index) => {
            char.style.transitionDelay = `${index * 0.02}s`;
            char.style.transform = 'translateY(0)';
        });
    }, 150);

    // ==========================================
    // 5. INTERSECTION OBSERVER FOR FADE/SLIDE UP
    // ==========================================
    const animElements = document.querySelectorAll('.animate-in');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once revealed to keep layout responsive
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 6. MAGNETIC HOVER EFFECTS
    // ==========================================
    const magneticElements = document.querySelectorAll('.magnetic');
    
    // Apply magnetic hover if on a desktop/hover-capable device
    if (window.matchMedia("(pointer: fine)").matches) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', function(e) {
                const bound = this.getBoundingClientRect();
                const x = e.clientX - bound.left - (bound.width / 2);
                const y = e.clientY - bound.top - (bound.height / 2);
                
                // Pull elements toward cursor slightly (30% of offset distance)
                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            el.addEventListener('mouseleave', function() {
                // Reset smoothly
                this.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // ==========================================
    // 7. PROJECT SEARCH & FILTER SYSTEM
    // ==========================================
    const searchInput = document.getElementById('projectSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (searchInput && projectCards.length > 0) {
        searchInput.addEventListener('input', filterProjects);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProjects();
            });
        });

        function filterProjects() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const activeChip = document.querySelector('.filter-btn.active');
            const selectedCategory = activeChip ? activeChip.getAttribute('data-filter') : 'all';

            projectCards.forEach(card => {
                const title = card.getAttribute('data-title') ? card.getAttribute('data-title').toLowerCase() : '';
                const category = card.getAttribute('data-category') ? card.getAttribute('data-category').toLowerCase() : '';
                
                const tags = Array.from(card.querySelectorAll('.project-tech-stack span'))
                    .map(span => span.textContent.toLowerCase());
                
                const description = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

                const matchesSearch = title.includes(searchTerm) || 
                                     tags.some(tag => tag.includes(searchTerm)) || 
                                     description.includes(searchTerm);
                                     
                const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    if (card.hideTimeout) {
                        clearTimeout(card.hideTimeout);
                        card.hideTimeout = null;
                    }
                    card.style.display = '';
                    setTimeout(() => {
                        card.classList.remove('card-hidden');
                    }, 20);
                } else {
                    if (!card.classList.contains('card-hidden')) {
                        card.classList.add('card-hidden');
                        if (!card.hideTimeout) {
                            card.hideTimeout = setTimeout(() => {
                                card.style.display = 'none';
                                card.hideTimeout = null;
                            }, 400); // 400ms matches the transition duration in CSS
                        }
                    }
                }
            });
        }
    }

    // ==========================================
    // 8. INTER-PAGE WIPE TRANSITIONS HANDLER
    // ==========================================
    // Bind wipe transition to all cross-file internal page navigation links
    const internalLinks = document.querySelectorAll('a');
    internalLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes('.html') || href.startsWith('index.html') || href.startsWith('project.html'))) {
            link.addEventListener('click', (e) => {
                const currentPath = window.location.pathname.split('/').pop() || 'index.html';
                const targetPage = href.split('#')[0];

                // Check if target filename is different from current filename
                if (targetPage && targetPage !== currentPath) {
                    e.preventDefault();
                    navigateWithTransition(href);
                }
            });
        }
    });

    // ==========================================
    // 9. FORMSPREE AJAX SUBMISSION HANDLER
    // ==========================================
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (form) {
      form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Stop standard browser redirect page load
        
        // Create Form Data payload
        const data = new FormData(event.target);
        
        // Visual feedback: Show loading state on the submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending message...';

        // Send request via Fetch API
        try {
          const response = await fetch("https://formspree.io/f/mzdlgzkn", {
            method: "POST",
            body: data,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            // Success Handler
            status.innerHTML = "✨ Thank you! Your message has been sent successfully.";
            status.className = "form-status-message success";
            form.reset(); // Clear input fields
          } else {
            // Error Handler from server side Response
            const responseData = await response.json();
            if (responseData && Object.hasOwn(responseData, 'errors')) {
              status.innerHTML = responseData['errors'].map(error => error.message).join(", ");
            } else {
              status.innerHTML = "❌ Oops! There was a problem submitting your form.";
            }
            status.className = "form-status-message error";
          }
        } catch (error) {
          // Network Level Error Handler
          status.innerHTML = "❌ Oops! A network error occurred. Please try again.";
          status.className = "form-status-message error";
        } finally {
          // Re-enable the submit button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }

});

// Global navigation functions
function navigateWithTransition(url) {
    const wipe = document.querySelector('.page-transition-wipe');
    if (wipe) {
        wipe.style.display = 'block';
        // Force layout reflow
        wipe.offsetHeight;
        
        // Trigger wipe slide-up
        wipe.classList.remove('exit');
        wipe.classList.add('active');

        // Route after animation finishes
        setTimeout(() => {
            window.location.href = url;
        }, 550);
    } else {
        window.location.href = url;
    }
}

function navigateToProjects() {
    navigateWithTransition('project.html');
}