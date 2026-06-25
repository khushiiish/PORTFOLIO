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
    // 7. TIMEZONE CLOCK UPDATER (IST UTC+5:30)
    // ==========================================
    function updateTimezoneClock() {
        const clockEl = document.getElementById('timezone-clock');
        if (!clockEl) return;

        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedTime = formatter.format(new Date());
        clockEl.textContent = `${formattedTime} IST`;
    }

    // Initialize and run time ticking
    updateTimezoneClock();
    setInterval(updateTimezoneClock, 1000);

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