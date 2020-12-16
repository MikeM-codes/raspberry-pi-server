const apiStatusIndicatorEl = document.querySelector('#api-status-indicator')
const formEl = document.querySelector('form')

const isProd = false
const API_URL = isProd
  ? 'http://dev.embrycode.com/api'
  : 'http://localhost:3000'

fetch(`${API_URL}/health-check`)
  .then((res) => {
    const isHealthy = res.status === 200

    setApiStatus(isHealthy)
  })
  .catch((err) => {
    console.error(err)

    setApiStatus(false)
  })

function setApiStatus(isHealthy) {
  apiStatusIndicatorEl.className = isHealthy ? 'bg-green' : 'bg-red'
}

formEl.onsubmit = function (e) {
  e.preventDefault()

  const body = new URLSearchParams(new FormData(e.target))

  fetch(`${API_URL}/guitars`, {
    method: 'POST',
    body,
  })
    .then((res) => res.json())
    .then((body) => {
      alert('Guitar saved')
    })
    .catch((err) => {
      console.error(err)
      alert('Error saving guitar')
    })
}
