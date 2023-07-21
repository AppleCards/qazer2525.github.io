// Get the query parameter for the wish message from the URL
const urlParams = new URLSearchParams(window.location.search);
const wishMessage = urlParams.get('wish');
const toggleThemeButton = document.getElementById('toggle-theme-btn');
const themeStylesheet = document.getElementById('theme-stylesheet');
const backToTopButton = document.querySelector('.back-to-top-btn');
let isDarkMode = false;
// Update the wish message on the wish page
const wishMessageElement = document.getElementById('wish-message');
wishMessageElement.textContent = wishMessage;

document.addEventListener('DOMContentLoaded', function() {
    const wishContainer = document.querySelector('.wish-container');
    wishContainer.classList.add('fade-in');
  });

  function toggleTheme() {
    if (isDarkMode) {
      themeStylesheet.setAttribute('href', 'styles-light.css');
      isDarkMode = false;
    } else {
      themeStylesheet.setAttribute('href', 'styles-dark.css');
      isDarkMode = true;
    }
}
toggleThemeButton.addEventListener('click', toggleTheme);