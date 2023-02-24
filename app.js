const countries = document.querySelector(".countries");
const regionList = document.querySelector("#regionList");
const search = document.querySelector(".search");
const options = document.querySelector(".options");
let borderCountries = document.querySelector(".borderCountries");
const allCountries = `https://restcountries.com/v3.1/all`;

let storage;

fetch(allCountries)
   .then(Response => {
      return Response.json();
   })
   .then(data => {
      storage = data;
      countryGen();
   })


function countryGen() {
   for (let i = 0; i < 250; i++) {
      const countryName = storage[i].name.common;
      const population = storage[i].population;
      const continents = storage[i].continents[0];
      let capital;
      const img = storage[i].flags.png;
      if (storage[i].hasOwnProperty('capital')) {
         capital = storage[i].capital[0];
      } else { capital = "Unknown"; }
      countries.innerHTML += `<div class="template">
      <div class="flagDiv">
         <img class="flag" src=${img} alt="">
      </div>
      <div class="descriptionDiv">
         <div class="description">
            <p class="countryName">${countryName}</p>
            <div class="stats">
               <p class="bold">Population: <span class="population">${population}</span></p>
               <p class="bold">Region: <span class="region">${continents}</span></p>
               <p class="bold">Capital: <span class="capital">${capital}</span></p>
            </div>
         </div>
      </div>
      </div>`;
   }
   setTimeout(() => {
      detailInfo();
      dark();
   }, 100);
}

regionList.addEventListener("change", () => {
   if (regionList.value !== "") {
      changeContinent(regionList.value);
      dark();
   }
})

function changeContinent(region) {
   countries.innerHTML = "";
   for (let i = 0; i < 250; i++) {
      const countryName = storage[i].name.common;
      const population = storage[i].population;
      const continents = storage[i].continents[0];
      let capital;
      const img = storage[i].flags.png;
      if (storage[i].hasOwnProperty('capital')) {
         capital = storage[i].capital[0];
      } else { capital = "Unknown"; }
      if (storage[i].continents[0] === region) {
         countries.innerHTML += `<div class="template">
            <div class="flagDiv">
               <img class="flag" src=${img} alt="">
            </div>
            <div class="descriptionDiv">
               <div class="description">
                  <p class="countryName">${countryName}</p>
                  <div class="stats">
                     <p class="bold">Population: <span class="population">${population}</span></p>
                     <p class="bold">Region: <span class="region">${continents}</span></p>
                     <p class="bold">Capital: <span class="capital">${capital}</span></p>
                  </div>
               </div>
            </div>
            </div>`;
      }
   }
   detailInfo();
}

search.addEventListener("input", () => {
   countries.innerHTML = "";
   for (let i = 0; i < 250; i++) {
      if (storage[i].name.common.toLowerCase().includes(search.value)) {
         const countryName = storage[i].name.common;
         const population = storage[i].population;
         const continents = storage[i].continents[0];
         let capital;
         const img = storage[i].flags.png;
         if (storage[i].hasOwnProperty('capital')) {
            capital = storage[i].capital[0];
         } else { capital = "Unknown"; }
         countries.innerHTML += `<div class="template">
      <div class="flagDiv">
         <img class="flag" src=${img} alt="">
      </div>
      <div class="descriptionDiv">
         <div class="description">
            <p class="countryName">${countryName}</p>
            <div class="stats">
               <p class="bold">Population: <span class="population">${population}</span></p>
               <p class="bold">Region: <span class="region">${continents}</span></p>
               <p class="bold">Capital: <span class="capital">${capital}</span></p>
            </div>
         </div>
      </div>
      </div>`;
      }
   }
   detailInfo();
   dark();
});


function detailInfo() {
   let targets = document.getElementsByClassName("template");
   for (elem of targets) {
      elem.addEventListener('click', (e) => {
         const name = e.currentTarget.childNodes[3].childNodes[1].childNodes[1].innerText;
         const api = `https://restcountries.com/v3.1/name/${name}?fullText=true`
         fetch(api)
            .then(Response => {
               return Response.json();
            })
            .then(data => {
               const flagImg = data[0].flags.png;
               const detailCountryName = data[0].name.common;
               const detailPopulation = data[0].population;
               const detailRegion = data[0].region;
               const detailSubRegion = data[0].subregion;
               let nativeName;
               let detailCapital;
               let currencies;
               let languagesCount;
               let languages = "";
               function checkObjectProperties() {
                  "nativeName" in data[0].name ? nativeName = Object.values(data[0].name.nativeName)[0].common : nativeName = "";
                  "capital" in data[0] ? detailCapital = data[0].capital[0] : detailCapital = "";
                  "currencies" in data[0] ? currencies = Object.values(data[0].currencies)[0].name : currencies = "";
                  "languages" in data[0] ? languagesCount = Object.values(data[0].languages).length : languagesCount = "";

               }

               const topLevelDomain = data[0].tld;
               checkObjectProperties();

               if (languagesCount > 1) {
                  for (let i = 0; i < languagesCount; i++) {
                     languages += Object.values(data[0].languages)[i];
                     if (languagesCount - i !== 1) {
                        languages += ", "
                     }
                  }
               } if (languagesCount === 1) {
                  languages = Object.values(data[0].languages)[0];
               }

               try {
                  let bordersCount = data[0].borders.length;
                  setTimeout(() => {
                     let allInfo = document.querySelector(".allInfo");
                     allInfo.innerHTML += `<div class="borderCountries">
                        <p class="bold">Border Countries: </p>
                        </div>`;

                  }, 50);

                  setTimeout(() => {
                     for (let i = 0; i < bordersCount; i++) {
                        fetch(`https://restcountries.com/v3.1/alpha/${data[0].borders[i]}`)
                           .then(Response => {
                              return Response.json();
                           })
                           .then(newData => {
                              const neighborName = newData[0].name.common;
                              let neighbors = document.querySelector(".borderCountries");
                              neighbors.innerHTML += `<button class="borderCountry">${neighborName}</button>`;
                              darker();
                              neighborGen();

                              function neighborGen() {
                                 const borderCountryList = document.getElementsByClassName("borderCountry");
                                 for (elem of borderCountryList) {
                                    elem.addEventListener('click', (e) => {
                                       const name = e.currentTarget.innerText;
                                       fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
                                          .then(Response => {
                                             return Response.json();
                                          })
                                          .then(data => {
                                             console.log(data);
                                             let nativeName;
                                             let detailCapital;
                                             let currencies;
                                             let languagesCount;
                                             let languages = "";

                                             "nativeName" in data[0].name ? nativeName = Object.values(data[0].name.nativeName)[0].common : nativeName = "";
                                             "capital" in data[0] ? detailCapital = data[0].capital[0] : detailCapital = "";
                                             "currencies" in data[0] ? currencies = Object.values(data[0].currencies)[0].name : currencies = "";
                                             "languages" in data[0] ? languagesCount = Object.values(data[0].languages).length : languagesCount = "";

                                             if (languagesCount > 1) {
                                                for (let i = 0; i < languagesCount; i++) {
                                                   languages += Object.values(data[0].languages)[i];
                                                   if (languagesCount - i !== 1) {
                                                      languages += ", "
                                                   }
                                                }
                                             } if (languagesCount === 1) {
                                                languages = Object.values(data[0].languages)[0];
                                             }

                                             document.querySelector(".detailFlag").src = data[0].flags.png;
                                             document.querySelector(".detailCountryName").innerText = name;
                                             document.querySelector(".nativeName").innerText = nativeName;
                                             document.querySelector(".Detailpopulation").innerText = data[0].population;
                                             document.querySelector(".detailRegion").innerText = data[0].region;
                                             document.querySelector(".detailSubRegion").innerText = data[0].subregion;
                                             document.querySelector(".detailCapital").innerText = detailCapital;
                                             document.querySelector(".detailDomain").innerText = data[0].tld;
                                             document.querySelector(".detailCurrencies").innerText = currencies;
                                             document.querySelector(".detailLanguages").innerText = languages;

                                             let borderCountries = document.querySelector(".borderCountries");
                                             borderCountries.innerHTML = `<p class = "bold">Border Countries: </p>`;
                                             bordersCount = data[0].borders.length;

                                             for (let i = 0; i < bordersCount; i++) {
                                                fetch(`https://restcountries.com/v3.1/alpha/${data[0].borders[i]}`)
                                                   .then(Response => {
                                                      return Response.json();
                                                   })
                                                   .then(newData => {
                                                      const neighborName = newData[0].name.common;
                                                      borderCountries.innerHTML += `<button class="borderCountry">${neighborName}</button>`;
                                                      neighborGen();
                                                      darker();
                                                   })
                                             }
                                          })
                                    })
                                 }
                              }
                           })
                     }
                  }, 200)

               } catch (error) {
                  setTimeout(() => {
                     let allInfoFake = document.querySelector(".allInfo");
                     allInfoFake.innerHTML += `<div class="borderCountries">
                        <p class="bold">Border Countries: <i>No borders</i></p>
                        </div>`;
                  }, 50);
               }

               countries.style.display = "none";
               options.style.display = "none";
               const section = document.createElement("section");
               section.classList.add("detailedView");
               document.body.prepend(section);
               section.innerHTML += `<div class="content">
         <div class="back">
            <button class="backButton"><span>←</span>Back</button>
         </div>
         <div>
            <img class="detailFlag"
               src="${flagImg}" alt="">
         </div>
         <div class="allInfo">
            <div class="detailHeader">
               <h1 class="detailCountryName">${detailCountryName}</h1>
            </div>
            <div class="list1">
               <ul>
                  <li>
                     <p class="bold">Native Name: <span class="nativeName">${nativeName}</span></p>
                  </li>
                  <li>
                     <p class="bold">Population: <span class="Detailpopulation">${detailPopulation}</span></p>
                  </li>
                  <li>
                     <p class="bold">Region: <span class="detailRegion">${detailRegion}</span></p>
                  </li>
                  <li>
                     <p class="bold">Sub Region: <span class="detailSubRegion">${detailSubRegion}</span></p>
                  </li>
                  <li>
                     <p class="bold">Capital: <span class="detailCapital">${detailCapital}</span></p>
                  </li>
               </ul>
            </div>
            <div class="list2">
               <ul>
                  <li>
                     <p class="bold">Top Level Domain: <span class="detailDomain">${topLevelDomain}</span></p>
                  </li>
                  <li>
                     <p class="bold">Currencies: <span class="detailCurrencies">${currencies}</span></p>
                  </li>
                  <li>
                     <p class="bold">Languages: <span class="detailLanguages">${languages}</span></p>
                  </li>
               </ul>
            </div>
         </div>
      </div>`;
               localStorage.length === 1 ? (darker(), darkmodeOn()) : darkmodeOff();

               const backButton = document.querySelector(".backButton");
               backButton.addEventListener("click", () => {
                  countries.style.display = "";
                  options.style.display = "";
                  section.classList.toggle("pageClose");
                  setTimeout(() => {
                     section.remove();
                  }, 455);
               })
            })
      });
   }
}


window.addEventListener("scroll", () => {
   const nav = document.querySelector("nav");
   if (scrollY > 800) {
      nav.style.position = "fixed";
      nav.style.width = "100%";
   } else {
      nav.style.position = "";
      nav.style.width = "";
   }
});

