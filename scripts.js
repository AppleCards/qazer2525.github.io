// Your birthday wishes data (sample wishes)
const birthdayWishes = {
  "James": "Happy Birthday! May all your dreams come true!",
  "Alice": "Wishing you a day filled with joy and laughter!",
  "John": "May this year bring you lots of happiness and success!",
  "Emily": "Here's to another year of wonderful adventures and memories!",
  "Michael": "May your birthday be as special as you are!",
  "gg": "Here's to another year of wonderful adventures and memories!",
  "ss": "Here's to another year of wonderful adventures and memories!",
  "cc": "Here's to another year of wonderful adventures and memories!",
  "aa": "Here's to another year of wonderful adventures and memories!",
  "xx": "Here's to another year of wonderful adventures and memories!"
};



const toggleThemeButton = document.getElementById('toggle-theme-btn');
const themeStylesheet = document.getElementById('theme-stylesheet');
const backToTopButton = document.querySelector('.back-to-top-btn');
backToTopButton.addEventListener('click', scrollToTop);
let isDarkMode = false;
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling animation
  });
}
// Toggle between light and dark mode
function toggleTheme() {
  if (isDarkMode) {
    themeStylesheet.setAttribute('href', 'styles-light.css');
    isDarkMode = false;
  } else {
    themeStylesheet.setAttribute('href', 'styles-dark.css');
    isDarkMode = true;
  }
  updateButtonsStyle();
}
  function createButtons() {
    const wishContainer = document.getElementById('wish-container');
  
    for (const person in birthdayWishes) {
      const button = document.createElement('button');
      button.textContent = person;
      button.classList.add('wish-button');
      button.addEventListener('click', () => redirectToWishPage(person));
      wishContainer.appendChild(button);
    }
  }
  function redirectToWishPage(person) {
    window.location.href = `wish-page.html?wish=${encodeURIComponent(birthdayWishes[person])}`;
  }

  // Call the function to display the wishes when the page loads
  document.addEventListener("DOMContentLoaded", function(){
    const wishContainer = document.querySelector('.jar-container');
    wishContainer.classList.add('fade-in');
    createButtons();
    
  });
  toggleThemeButton.addEventListener('click', toggleTheme);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });


  