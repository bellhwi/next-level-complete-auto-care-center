// add classes for mobile navigation toggling
var CSbody = document.querySelector('body')
const CSnavbarMenu = document.querySelector('#cs-navigation')
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle')

if (CShamburgerMenu !== null) {
  CShamburgerMenu.addEventListener('click', function () {
    CShamburgerMenu.classList.toggle('cs-active')
    CSnavbarMenu.classList.toggle('cs-active')
    CSbody.classList.toggle('cs-open')
    // run the function to check the aria-expanded value
    ariaExpanded()
  })
}

const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'))
for (const item of faqItems) {
  const onClick = () => {
    item.classList.toggle('active')
  }
  item.addEventListener('click', onClick)
}

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
  const csUL = document.querySelector('#cs-expanded')
  const csExpanded = csUL.getAttribute('aria-expanded')

  if (csExpanded === 'false') {
    csUL.setAttribute('aria-expanded', 'true')
  } else {
    csUL.setAttribute('aria-expanded', 'false')
  }
}

// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll
// animations with the navbar

document.addEventListener('scroll', (e) => {
  const scroll = document.documentElement.scrollTop
  if (scroll >= 100) {
    document.querySelector('body').classList.add('scroll')
  } else {
    document.querySelector('body').classList.remove('scroll')
  }
})

// mobile nav toggle code
const dropDowns = Array.from(
  document.querySelectorAll('#cs-navigation .cs-dropdown')
)
for (const item of dropDowns) {
  const onClick = () => {
    item.classList.toggle('cs-active')
  }
  item.addEventListener('click', onClick)
}

//
//    The Dark Mode System
//

// helper functions to toggle dark mode
function enableDarkMode() {
  document.body.classList.add('dark-mode')
  localStorage.setItem('theme', 'dark')
}
function disableDarkMode() {
  document.body.classList.remove('dark-mode')
  localStorage.setItem('theme', 'light')
}

// determines a new users dark mode preferences
function detectColorScheme() {
  // default to the light theme
  let theme = 'light'

  // check localStorage for a saved 'theme' variable. if it's there, the user has visited before, so apply the necessary theme choices
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme')
  }
  // if it's not there, check to see if the user has applied dark mode preferences themselves in the browser
  else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    theme = 'dark'
  }

  // if there is no preference set, the default of light will be used. apply accordingly
  theme === 'dark' ? enableDarkMode() : disableDarkMode()
}

// run on page load
detectColorScheme()

if (document.getElementById('dark-mode-toggle') !== null) {
  // add event listener to the dark mode button toggle
  document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    // on click, check localStorage for the dark mode value, use to apply the opposite of what's saved
    localStorage.getItem('theme') === 'light'
      ? enableDarkMode()
      : disableDarkMode()
  })
}

// Set the current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear()

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search)

  // UTM 저장
  const utm_source = urlParams.get('utm_source')
  if (utm_source) {
    sessionStorage.setItem('utm_source', utm_source)
  }

  const storedUtm = sessionStorage.getItem('utm_source')

  // 예약 버튼에 UTM 추가
  const bookingBtns = document.querySelectorAll('.conversion-book-call')
  if (storedUtm) {
    bookingBtns.forEach((btn) => {
      const href = btn.getAttribute('href')
      const separator = href.includes('?') ? '&' : '?'
      const newHref = `${href}${separator}utm_source=${storedUtm}`
      btn.setAttribute('href', newHref)
    })

    // 폼 히든 인풋에 UTM 삽입
    const utmInput = document.getElementById('utm_source')
    if (utmInput) {
      utmInput.value = storedUtm
    }
  }

  // 폼 리셋 (쿼리 파라미터에 clearForm=true 있을 경우)
  if (urlParams.get('clearForm') === 'true') {
    const form = document.getElementById('cs-form-1105')
    if (form) {
      form.reset()
    }
  }
})
