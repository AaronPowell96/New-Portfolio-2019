////////////////////////////////////
//Window events / User position events
///////////////////////////////////
document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);
function theDomHasLoaded() {
window.addEventListener("load", checkInView);
window.addEventListener("scroll", function() {
  stickyFunc();
  sectionDetection();
  checkInView();
});
///////////////////////////////////
//Menus
//////////////////////////////////

//Submenu - hamburger menu
(() => {
  const subMenu = document.querySelector(".side-nav__subMenu");
  const moredots = document.querySelector(".more-dots");
  function closeBurgerMenu(){
      subMenu.classList.remove("scale-out-ver-top");
      subMenu.classList.remove("scale-in-ver-top");
      moredots.firstElementChild.classList.remove("open");
      moredots.firstElementChild.firstElementChild.classList.add("fa-bars");
  };
  window.addEventListener("click", closeBurgerMenu);
  moredots.addEventListener(
    "click",
    function(ev) {
      console.log(this.firstElementChild);
      this.firstElementChild.classList.toggle("open");
      this.firstElementChild.firstElementChild.classList.toggle("fa-bars");
      if (subMenu.classList.contains("scale-in-ver-top")) {
        subMenu.classList.toggle("scale-out-ver-top");
      } else {
        subMenu.classList.toggle("scale-in-ver-top");
      }
      ev.stopPropagation();
    },
    true
  );
})();
///////////////////////////
//Reused Functions
//////////////////////////
//Sleeper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//////////////////////////
//Landing Page
//////////////////////////
//Title flash on click
document.querySelector(".title").addEventListener("click", function() {
  this.classList.toggle("text-flicker-in-glow");
});
//Icons animate in on webpage load IFFE async
(async function animateIcons() {
  for (let index = 0; index < 4; index++) {
    let icon = document.querySelector(`.animatedIcon-${index}`);
    icon.style.opacity = "1";
    let elements = icon.children;
    elements[0].classList.add("scale-in-center");
    await sleep(200);
  }
})();


//Section breakpoints to switch "active" state.
//let section3 = sections[2].offsetTop - 60;
//Sticky Navigation
// Add the sticky class to the navbar when reach its scroll position. Remove "sticky" when leave the scroll position
function stickyFunc() {
  const sections = document.querySelectorAll("section");
  var navbar = document.querySelector(".sidebar");
  var sticky = navbar.offsetTop;
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    sections.forEach((section)=>{
      section.style.paddingTop = "62px";
    })
  } else {
    navbar.classList.remove("sticky");
    sections.forEach((section)=>{
      section.style.paddingTop = "30px";
    })
  }
}

//Adds event listener to remove all active navs and add to the one being clicked.
const sideNavItems = document.querySelectorAll(".side-nav__item");
function removeActiveClass() {
  sideNavItems.forEach(el => {
    el.classList.remove("side-nav__item--active");
  });
}
for (let i = 0; i < sideNavItems.length - 1; i++) {
  sideNavItems[i].addEventListener("click", () => {
    removeActiveClass();
    sideNavItems[i].classList.add("side-nav__item--active");
  });
}

function sectionDetection() {
  const sections = document.querySelectorAll("section");
  let section1 = sections[0].offsetTop - 300;
  let section2 = sections[1]?.offsetTop - 300;
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

///////////////////////////////
//Timeline section
//////////////////////////////
//Checks if each element called in above the windows innerheight and shows, removes when 50 below top of window.
function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 50 &&
    rect.left >= 0 &&
    rect.bottom <=
    (window.innerHeight + 100 ||
      document.documentElement.clientHeight + 100) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    //Checks specific highlight element is wihin the viewport
    function checkInView() {
      const highlights = document.querySelectorAll(".timeline li");
  if(highlights){
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
}

/////////////////////////////////////
///CONTEXT MENU
/////////////////////////////////////
function isHover(e) {
  return e.parentElement.querySelector(":hover") === e;
}
const contextMenu = document.querySelector("ul.contextMenu");
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
  contextMenu.classList.remove("hidden");
  if (event.pageY + 80 < window.innerHeight) {
    contextMenu.style["top"] = event.pageY + 5 + "px";
    console.log("true");
  } else {
    contextMenu.style["top"] = window.innerHeight - 60 + "px";
  }
  if (event.pageX + 180 < window.innerWidth) {
    contextMenu.style["left"] = event.pageX + 10 + "px";
  } else {
    contextMenu.style["left"] = window.innerWidth - 180 + "px";
  }
});

document.addEventListener("click", function() {
  if (!isHover(contextMenu)) {
    contextMenu.classList.add("hidden");
  }
});  
}
