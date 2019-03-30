function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelector(".title").addEventListener("click", function() {
  this.classList.toggle("text-flicker-in-glow");
});

(async function animateIcons() {
  for (let index = 0; index < 4; index++) {
    let icon = document.querySelector(`.animatedIcon-${index}`);
    icon.style.opacity = "1";
    let elements = icon.children;
    elements[0].classList.add("scale-in-center");
    await sleep(500);
  }
})();

const icons = document.querySelector(".icons").children;
console.log(icons[1]);
for (i = 0; i < icons.length; i++) {
  icons[i].addEventListener("mouseover", async function() {
    this.classList.add("text-pop-up-top");
    await sleep(1000);
    this.classList.remove("text-pop-up-top");
  });
}
/* icons[i].addEventListener("mouseleave", function() {
    this.classList.toggle("text-pop-up-top");
  });
} //llist of icons*/

// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  myFunction();
  sectionDetection();
};

// Get the navbar
var navbar = document.querySelector(".sidebar");
// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

const sideNavItems = document.querySelectorAll(".side-nav__item");
function removeActiveClass() {
  sideNavItems.forEach(el => {
    el.classList.remove("side-nav__item--active");
  });
}
sideNavItems.forEach(el =>
  el.addEventListener("click", () => {
    removeActiveClass();
    el.classList.add("side-nav__item--active");
  })
);

var sections = document.querySelectorAll("section");
let section1 = sections[0].offsetTop - 60;
let section2 = sections[1].offsetTop - 60;
//let section3 = sections[2].offsetTop - 60;
function sectionDetection() {
  if (window.pageYOffset >= section1 && !(window.pageYOffset >= section2)) {
    removeActiveClass();
    sideNavItems[1].classList.add("side-nav__item--active");
  } else if (window.pageYOffset >= section2) {
    removeActiveClass();
    sideNavItems[2].classList.add("side-nav__item--active");
  } else {
    removeActiveClass();
    sideNavItems[0].classList.add("side-nav__item--active");
  }
}
