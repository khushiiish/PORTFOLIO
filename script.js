// // ====== MOBILE RESPONSIVE HAMBURGER NAVIGATION ======
// const menuIcon = document.querySelector('#menu-icon');
// const navbar = document.querySelector('.navbar');

// menuIcon.onclick = () => {
//     menuIcon.classList.toggle('fa-xmark'); // Switches your menu bars icon to an 'X' icon on click
//     navbar.classList.toggle('active');
// };

// // ====== AUTOMATIC SCROLL-SPY NAV LINK HIGHLIGHTER ======
// const sections = document.querySelectorAll('section');
// const navLinks = document.querySelectorAll('header nav a');

// const scrollSpyOptions = {
//     threshold: 0.4 // Highlights active window target when 40% of section bounds hit display
// };

// const scrollSpyObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const id = entry.target.getAttribute('id');
//             navLinks.forEach(link => {
//                 link.classList.remove('active');
//                 if (link.getAttribute('href') === `#${id}`) {
//                     link.classList.add('active');
//                 }
//             });
            
//             // Cleanly close mobile navigation drawer when a link is clicked on desktop / scroll actions
//             menuIcon.classList.remove('fa-xmark');
//             navbar.classList.remove('active');
//         }
//     });
// }, scrollSpyOptions);

// sections.forEach(section => scrollSpyObserver.observe(section));


// // ====== DARK / LIGHT THEME TOGGLE ENGINE ======
// const themeToggle = document.querySelector('#theme-toggle');
// const themeIcon = document.querySelector('#theme-toggle i');

// // Read local storage config on system startup to persist user choice
// if (localStorage.getItem('theme') === 'light') {
//     document.body.classList.add('light-mode');
//     themeIcon.classList.replace('fa-moon', 'fa-sun');
// }

// themeToggle.onclick = () => {
//     document.body.classList.toggle('light-mode');
    
//     if (document.body.classList.contains('light-mode')) {
//         themeIcon.classList.replace('fa-moon', 'fa-sun');
//         localStorage.setItem('theme', 'light');
//     } else {
//         themeIcon.classList.replace('fa-sun', 'fa-moon');
//         localStorage.setItem('theme', 'dark');
//     }
// };