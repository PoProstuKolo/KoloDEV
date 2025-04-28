
const form = document.querySelector('.contact__form')
const inputs = form.querySelectorAll('input[required], textarea[required]')
const msgStatus = form.querySelector('.msg-status')

function showError(input, message) {
	input.classList.add('input-error')
	let error = input.nextElementSibling
	if (!error || !error.classList.contains('error-message')) {
		error = document.createElement('div')
		error.className = 'error-message'
		input.parentNode.insertBefore(error, input.nextSibling)
	}
	error.textContent = message
}

function clearError(input) {
	input.classList.remove('input-error')
	const error = input.nextElementSibling
	if (error && error.classList.contains('error-message')) {
		error.remove()
	}
}

function validateInput(input) {
	const value = input.value.trim()
	let isValid = true

	if (input.type === 'email') {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(value)) {
			showError(input, 'Podaj poprawny adres e-mail.')
			isValid = false
		} else {
			clearError(input)
		}
	} else {
		if (value === '') {
			showError(input, 'To pole jest wymagane.')
			isValid = false
		} else {
			clearError(input)
		}
	}

	return isValid
}

inputs.forEach(input => {
	input.addEventListener('input', () => validateInput(input))
	input.addEventListener('blur', () => validateInput(input))
})



if (document.location.search === '?mail_status=sent') {
	msgStatus.classList.add('success')
	msgStatus.textContent = 'Wiadomość wysłana!'

	setTimeout(() => {
		msgStatus.classList.remove('success')
	}, 3000)
}

if (document.location.search === '?mail_status=error') {
	msgStatus.classList.add('error')
	msgStatus.textContent = 'Wystąpił błąd.'

	setTimeout(() => {
		msgStatus.classList.remove('error')
	}, 3000)
}
