'use strict'

window.addEventListener('load', windowLoad)
const html = document.documentElement

function windowLoad() {
  html.classList.add('loaded')
  document.addEventListener('click', documentActions)
  scrollActions()
}

function documentActions(e) {
  const type = e.type
  const targetElement = e.target

  if (type === 'click') {
    if (targetElement.closest('.action-menu')) {
      html.classList.toggle('menu-open')
      bodyLock(html.classList.contains('menu-open'))
    }
    if (
      targetElement.closest('.menu__link') &&
      html.classList.contains('menu-open')
    ) {
      html.classList.remove('menu-open')
      bodyLock(false)
    }
  }
}

const logo = document.querySelector('#logo')

logo.addEventListener('click', function (event) {
  event.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

function scrollActions() {
  window.addEventListener('scroll', scrollAction)

  function scrollAction() {
    const header = document.querySelector('.header')
    header.classList.toggle('header--scroll', scrollY > 20)
  }
}

const options = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.2,
}
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    const currentElement = entry.target
    if (entry.isIntersecting) {
      currentElement.classList.add('--animate')
    } else {
      currentElement.classList.remove('--animate')
    }
  })
}
const observer = new IntersectionObserver(callback, options)

const animElements = document.querySelectorAll('[class*="--anim"]')
animElements.forEach((animElement) => {
  observer.observe(animElement)
})
