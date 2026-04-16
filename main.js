const menuData = [
  {
    category: 'Lunch',
    items: [
      { name: 'Soup of the Day', price: '€3.50' },
      { name: 'Octopus Salad', price: '€12.40' },
      { name: 'Vegan Salad', price: '€8.50' },
      { name: 'Black Scabbardfish with Herbs', price: '€8.20' },
      { name: 'Roast Beef Wrap', price: '€8.20' },
      { name: 'Cheeseburger', price: '€8.20' },
      { name: 'Vegetarian Burger', price: '€7.20' }
    ]
  },
  {
    category: 'Snacks',
    items: [
      { name: 'Pumpkin Soup', price: '€3.20' },
      { name: 'Truffle Muxama Salad', price: '€11.80' },
      { name: 'Sweet Potato Chips & Hummus', price: '€5.50' },
      { name: 'Tuna Steak Sandwich', price: '€6.50' },
      { name: 'Black Pig Cheek Sandwich', price: '€6.00' },
      { name: 'Salmon Wrap', price: '€7.00' }
    ]
  },
  {
    category: 'Dinner',
    items: [
      { name: 'Atlantic Fish Soup', price: '€6.60' },
      { name: 'Local Veal Tartar', price: '€7.80' },
      { name: 'Oven Baked Salmon', price: '€13.80' },
      { name: 'Cheek of Black Pig', price: '€13.80' },
      { name: 'Beetroot Risotto', price: '€13.40' },
      { name: 'Crème Brûlée', price: '€3.80' }
    ]
  },
  {
    category: 'Drinks',
    items: [
      { name: 'Maracujá Lemonade', price: '€2.60' },
      { name: 'Regional Poncha', price: '€3.00' },
      { name: 'Margarita', price: '€6.50' },
      { name: 'Mojito (Rum 3 Anos)', price: '€5.00' },
      { name: 'Coral Beer (On Tap)', price: '€3.20' }
    ]
  },
  {
    category: 'Wine',
    items: [
      { name: 'Barbusano (Red, Madeira)', price: '€20.00' },
      { name: 'Atlantis (White, Madeira)', price: '€24.00' },
      { name: 'Opta (Red, Dão)', price: '€15.50' },
      { name: 'Fiuza 3 Castas (White, Tejo)', price: '€13.00' },
      { name: 'Herdade dos Grous (Red, Alentejo)', price: '€16.90' },
      { name: 'Quinta do Gomariz Rosé', price: '€14.00' }
    ]
  }
]

let current = 0
const itemsEl = document.getElementById('menu-items')
const titleEl = document.getElementById('menu-category')
const tabsEl = document.getElementById('menu-tabs')
const counterEl = document.getElementById('menu-counter')
const prevBtn = document.getElementById('menu-prev')
const nextBtn = document.getElementById('menu-next')

function render() {
  const cat = menuData[current]
  titleEl.textContent = cat.category

  itemsEl.innerHTML = cat.items.map(item => `
    <div class="menu-row">
      <span class="menu-name">${item.name}</span>
      <span class="menu-dots"></span>
      <span class="menu-price">${item.price}</span>
    </div>
  `).join('')

  counterEl.textContent = `${current + 1} / ${menuData.length}`

  tabsEl.querySelectorAll('.tab').forEach((el, i) => {
    el.classList.toggle('tab-active', i === current)
  })
}

menuData.forEach((cat, i) => {
  const tab = document.createElement('button')
  tab.className = 'tab'
  tab.textContent = cat.category
  tab.addEventListener('click', () => {
    if (current === i) return
    current = i
    render()
  })
  tabsEl.appendChild(tab)
})

prevBtn.addEventListener('click', () => {
  if (current > 0) { current--; render() }
})

nextBtn.addEventListener('click', () => {
  if (current < menuData.length - 1) { current++; render() }
})

render()

/* ── ABOUT PARALLAX ── */

const aboutSection = document.querySelector('.about')
const parallaxImgs = document.querySelectorAll('.about-img')
const isTouchDevice = 'ontouchstart' in window

let ticking = false
function updateParallax() {
  const rect = aboutSection.getBoundingClientRect()
  const sectionHeight = rect.height
  const viewportHeight = window.innerHeight
  const scrolled = -rect.top
  const progress = scrolled / (sectionHeight - viewportHeight)

  parallaxImgs.forEach((img, i) => {
    const speed = parseFloat(img.dataset.speed) || 0.1
    const yMove = scrolled * speed
    const xDir = i % 2 === 0 ? 1 : -1
    const xMove = progress * 80 * xDir * Math.abs(speed)

    img.style.transform = `translate(-50%, -50%) translate(${xMove}px, ${yMove}px)`
  })
  ticking = false
}

if (!isTouchDevice) {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }, { passive: true })
}

/* ── TESTIMONIALS CAROUSEL ── */

const archTrack = document.getElementById('arches-track')
const archCounter = document.getElementById('arch-counter')
const archPrev = document.getElementById('arch-prev')
const archNext = document.getElementById('arch-next')
const totalArches = archTrack.children.length
let archPage = 0

function getPerPage() {
  return window.innerWidth >= 768 ? 3 : 1
}

function getTotalPages() {
  return Math.ceil(totalArches / getPerPage())
}

function renderArches() {
  const offset = archPage * archTrack.parentElement.offsetWidth
  archTrack.style.transform = `translateX(-${offset}px)`
  archCounter.textContent = `${archPage + 1} / ${getTotalPages()}`
}

archPrev.addEventListener('click', () => {
  if (archPage > 0) { archPage--; renderArches() }
})

archNext.addEventListener('click', () => {
  if (archPage < getTotalPages() - 1) { archPage++; renderArches() }
})

window.addEventListener('resize', () => {
  if (archPage >= getTotalPages()) archPage = getTotalPages() - 1
  renderArches()
})

renderArches()

/* ── DRAWER MENU ── */

const drawer = document.getElementById('drawer')
const drawerBackdrop = document.getElementById('drawer-backdrop')
const hamburger = document.querySelector('.hamburger')
const drawerClose = document.getElementById('drawer-close')

function openDrawer() {
  drawer.classList.add('open')
  drawer.setAttribute('aria-hidden', 'false')
  drawerBackdrop.classList.add('visible')
  document.body.style.overflow = 'hidden'
}

function closeDrawer() {
  drawer.classList.remove('open')
  drawer.setAttribute('aria-hidden', 'true')
  drawerBackdrop.classList.remove('visible')
  document.body.style.overflow = ''
}

hamburger.addEventListener('click', () => {
  drawer.classList.contains('open') ? closeDrawer() : openDrawer()
})

drawerClose.addEventListener('click', closeDrawer)
drawerBackdrop.addEventListener('click', closeDrawer)

drawer.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    closeDrawer()
    const target = document.querySelector(link.getAttribute('href'))
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 400)
  })
})
