const countryUrl = new URLSearchParams(window.location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryName = document.querySelector('.details h1')
const nativeName = document.querySelector('.nativeName')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.subRegion')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.topLevelDomain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries') 
const themeChanger = document.querySelector('.theme-change')

let darkMode = localStorage.getItem('darkMode')


fetch(`https://restcountries.com/v3.1/name/${countryUrl}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    console.log(country);
    flagImage.src = country.flags.svg
    countryName.innerText = country.name.common

    if(country.subRegion) {
        subRegion.innerText = country.subregion
    } 
    
    if(country.capital) {
        capital.innerText = country.capital?.[0]
    } 

    if(country.currencies) {
        currencies.innerText = Object.values(country.currencies).map((curr) => curr.name).join(', ')
    }
 
    if(country.languages) {
        languages.innerText = Object.values(country.languages)[0]
    }

    if(country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }else {
        nativeName.innerText = country.name.common
    }

    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')

    if(country.languages) {
        languages.innerText = Object.values(country.languages).join(', ')
    }

    if(country.borders) {
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                const countryTag = document.createElement('a')
                countryTag.innerText = borderCountry.name.common
                countryTag.href = `country.html?name=${borderCountry.name.common}`
                borderCountries.append(countryTag)
            })
        })
    }
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

