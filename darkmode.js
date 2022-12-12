const switcherButton = document.querySelector(".switch");
const nav = document.querySelector("nav");
const header = document.querySelector(".header");
const searchCountry = document.querySelector(".searchCountry");
const filter = document.querySelector(".filter");
const template = document.getElementsByClassName("template");
const description = document.getElementsByClassName("description");
const searchIcon = document.querySelector(".searchIcon");
const option = document.getElementsByTagName("option");

let counter = 1;

switcherButton.addEventListener('click', () => {
   counter++;
   if (counter % 2 === 0) {
      localStorage.setItem("darkmode", true);
      darkmodeOn();
   }
   else {
      localStorage.removeItem("darkmode");
      darkmodeOff();
   }
});

function dark() {
   if (localStorage.length !== 0) {
      for (let i = 0; i < template.length; i++) {
         template[i].style.backgroundColor = "hsl(209, 23%, 22%)";
         description[i].style.color = "hsl(0, 0%, 100%)";
      }
   } else {
      for (let i = 0; i < template.length; i++) {
         template[i].style.backgroundColor = "";
         description[i].style.color = "";
      }
   }
}

const searchInput = document.querySelector(".search");

function darkmodeOn() {
   nav.style.backgroundColor = "hsl(209, 23%, 22%)";
   header.style.color = "hsl(0, 0%, 100%)";
   switcherButton.childNodes[3].style.color = "hsl(0, 0%, 100%)";
   switcherButton.childNodes[1].src = "./media/moon.png";
   document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
   searchCountry.style.backgroundColor = "hsl(209, 23%, 22%)";
   filter.style.backgroundColor = "hsl(209, 23%, 22%)";
   searchInput.style.color = "hsl(0, 0%, 100%)";
   searchInput.classList.add("placeholder");
   searchIcon.src = "./media/search-white.png";
   regionList.style.color = "hsl(0, 0%, 100%)";
   for (let i = 0; i < 8; i++) {
      option[i].style.color = "hsl(0, 0%, 100%)";
      option[i].style.backgroundColor = "hsl(209, 23%, 22%)";
   }
   for (let i = 0; i < template.length; i++) {
      template[i].style.backgroundColor = "hsl(209, 23%, 22%)";
      description[i].style.color = "hsl(0, 0%, 100%)";
   }
   if (document.querySelector(".detailedView")) {
      let detailedView = document.querySelector(".detailedView");
      let backButton = document.querySelector(".backButton");
      let allDetails = document.querySelector(".allInfo");
      let neighborCountries = document.getElementsByClassName("borderCountry");
      detailedView.style.backgroundColor = "hsl(207, 26%, 17%)";
      backButton.style.backgroundColor = "hsl(209, 23%, 22%)";
      backButton.style.color = "white";
      allDetails.style.color = "white";
      for (let i = 0; i < neighborCountries.length; i++) {
         neighborCountries[i].style.backgroundColor = "hsl(209, 23%, 22%)";
         neighborCountries[i].style.color = "white";
         neighborCountries[i].style.boxShadow = "rgb(0 0 0 / 10%) 0px 1px 2px 0px, rgb(0 0 0 / 10%) 0px 2px 6px 2px"
      }
   }
}

function darkmodeOff() {
   nav.style.backgroundColor = "";
   header.style.color = "";
   switcherButton.childNodes[3].style.color = "";
   switcherButton.childNodes[1].src = "./media/moon-outline.png";
   document.body.style.backgroundColor = "";
   searchCountry.style.backgroundColor = "";
   filter.style.backgroundColor = "";
   searchInput.style.color = "";
   searchInput.classList.remove("placeholder");
   searchIcon.src = "./media/search-black.png";
   regionList.style.color = "";
   for (let i = 0; i < 8; i++) {
      option[i].style.color = "";
      option[i].style.backgroundColor = "";
   }
   for (let i = 0; i < template.length; i++) {
      template[i].style.backgroundColor = "";
      description[i].style.color = "";
   }
   if (document.querySelector(".detailedView")) {
      let detailedView = document.querySelector(".detailedView");
      let backButton = document.querySelector(".backButton");
      let allDetails = document.querySelector(".allInfo");
      let neighborCountries = document.getElementsByClassName("borderCountry");
      detailedView.style.backgroundColor = "";
      backButton.style.backgroundColor = "";
      backButton.style.color = "";
      allDetails.style.color = "";
      for (let i = 0; i < neighborCountries.length; i++) {
         neighborCountries[i].style.backgroundColor = "";
         neighborCountries[i].style.color = "";
         neighborCountries[i].style.boxShadow = ""
      }
   }
}

function darker() {
   if (localStorage.length === 1) {
      let neighborCountries = document.getElementsByClassName("borderCountry");
      for (let i = 0; i < neighborCountries.length; i++) {
         neighborCountries[i].style.backgroundColor = "hsl(209, 23%, 22%)";
         neighborCountries[i].style.color = "white";
         neighborCountries[i].style.boxShadow = "rgb(0 0 0 / 10%) 0px 1px 2px 0px, rgb(0 0 0 / 10%) 0px 2px 6px 2px";
      }
   }
}


localStorage.length === 1 ? (counter = 2, darkmodeOn()) : darkmodeOff();

header.addEventListener("click", () => {
   location.reload();
})

window.addEventListener("load", () => {
   setTimeout(() => {
      dark();
   }, 30);
})