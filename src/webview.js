let count = 0

const container = document.querySelector('.line-of-code')

setInterval(() => {
  container.textContent = ++count
}, 100)
