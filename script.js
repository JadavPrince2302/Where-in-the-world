const countriesContainer = document.querySelector(".countries-container")
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')
let allCountriesData

let darkMode = localStorage.getItem('darkMode')


 fetch('https://restcountries.com/v3.1/all')
 .then((res) => res.json())
 .then((data) => {
    renderCountries(data)
    allCountriesData = data
 })

 filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

 function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
       const countryCard = document.createElement('a')
       countryCard.classList.add('country')
       countryCard.href = `/country.html?name=${country.name.common}`
       
       const cardHTML = 
       `  <img src=${country.flags.svg} alt="Flags">
                      <div class="card-text">
                       <h3 class=card-title>${country.name.common}</h3>
                       <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                       <p><b>Region: </b>${country.region}</p>
                       <p><b>Capital: </b>${country.capital}</p>
           </div>  
       `
       countryCard.innerHTML = cardHTML
       
       countriesContainer.append(countryCard)
    })
 }
 
 searchInput.addEventListener('input' , (e) => {
    const filteredCountry = allCountriesData.filter((country) =>  country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountry)
})

const darkModeEnabled = () => {
   const lightMode = themeChanger.innerHTML = `<p class="theme-change"><i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode</p>`
   document.body.classList.toggle('dark')
   localStorage.setItem('darkMode', 'enabled', 'lightMode')
}
const darkModeDisabled = () => {
    const darkmode = themeChanger.innerHTML = `<p class="theme-change"><i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode</p>`
   document.body.classList.remove('dark')
   localStorage.setItem('darkMode', 'disabled', 'darkmode')
}

if(darkMode === 'enabled') {
   darkModeEnabled()
}

themeChanger.addEventListener('click' , () => {
   darkMode = localStorage.getItem('darkMode')
   if(darkMode !== 'enabled') {
      darkModeEnabled()
   } else {
      darkModeDisabled()
   }
})



   
 






