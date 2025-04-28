const nav = document.querySelector('.nav')
const navMenu = document.querySelector('.nav__wrapper')
const navBtn = document.querySelector('.btn-menu')
const navItems = document.querySelectorAll('.nav__item')

const handleNav = () => {
	navBtn.classList.toggle('menu-open')
	navBtn.setAttribute('aria-expanded', navBtn.classList.contains('menu-open'))
	navMenu.classList.toggle('visible')

	navItems.forEach(link => {
		link.addEventListener('click', () => {
			navBtn.classList.remove('menu-open')
			navBtn.setAttribute('aria-expanded', navBtn.classList.contains('menu-open'))
			navMenu.classList.remove('visible')
		})
	})
}

const addShadow = () => {
	if (window.scrollY >= 50) {
		if (nav) nav.classList.add('scroll')
	} else {
		if (nav) nav.classList.remove('scroll')
	}
}

navBtn.addEventListener('click', handleNav)
document.addEventListener('scroll', addShadow)
