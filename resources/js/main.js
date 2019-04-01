function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelector(".title").addEventListener("click", function() {
  this.classList.toggle("text-flicker-in-glow");
});

/*
let icons = document.querySelector(".icons");
icons.style.opacity = "1";
icons.classList.add("scale-in-center");
*/
(async function animateIcons() {
  for (let index = 0; index < 4; index++) {
    let icon = document.querySelector(`.animatedIcon-${index}`);
    icon.style.opacity = "1";
    let elements = icon.children;
    elements[0].classList.add("scale-in-center");
    await sleep(200);
  }
})();

const subMenu = document.querySelector(".side-nav__subMenu");
const moredots = document.querySelector(".more-dots");
moredots.addEventListener(
  "click",
  function() {
    this.firstElementChild.classList.toggle("open");
    this.firstElementChild.firstElementChild.classList.toggle("fa-bars");
    console.log(subMenu);
    if (subMenu.classList.contains("slide-in-top")) {
      subMenu.classList.toggle("slide-out-top");
    } else {
      subMenu.classList.toggle("slide-in-top");
    }
  },
  true
);

// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  stickyFunc();
  sectionDetection();
};

// Get the navbar
var navbar = document.querySelector(".sidebar");
// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyFunc() {
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
/*
sideNavItems.forEach(el =>
  el.addEventListener("click", () => {
    removeActiveClass();
    el.classList.add("side-nav__item--active");
  })
);
*/
for (let i = 0; i < sideNavItems.length - 1; i++) {
  sideNavItems[i].addEventListener("click", () => {
    removeActiveClass();
    sideNavItems[i].classList.add("side-nav__item--active");
  });
}

var sections = document.querySelectorAll("section");
let section1 = sections[0].offsetTop - 300;
let section2 = sections[1].offsetTop - 300;
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

const highlights = document.querySelectorAll(".timeline li");

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 50 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight +100|| document.documentElement.clientHeight +100) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function checkInView() {
  for (let i = 0; i < highlights.length; i++) {
    if (isElementInViewport(highlights[i])) {
      if (!highlights[i].classList.contains("in-view")) {
        highlights[i].classList.add("in-view");
      }
    } else if (highlights[i].classList.contains("in-view")) {
      highlights[i].classList.remove("in-view");
    }
  }
}

window.addEventListener("load", checkInView);
window.addEventListener("scroll", checkInView);
