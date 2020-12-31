const apiStatusIndicatorEl = document.querySelector('#api-status-indicator')
const formEl = document.querySelector('form')

const isProd = true
const API_URL = isProd
  ? 'http://home.dev.embrycode.com/api'
  : 'http://localhost:3000'

fetch(`${API_URL}/guitars`, {
  method: 'GET'
})
  .then(handleErrors)
  .then((res) => {
    // Convert the response to JSON
    return res.json()
  })
  .then((resConvertedToJSON) => {
    // Work with the JSON data
    // Write all guitars onto the page
    const allGuitarsElement = document.getElementById('all-guitars')
    console.log(allGuitarsElement.innerText)
    allGuitarsElement.innerText = JSON.stringify(resConvertedToJSON, null, 2)
    console.log(allGuitarsElement.innerText)
  })
  .catch((err) => {
    console.error(err)
    alert('Error getting guitars')
  })

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

  const body = new URLSearchParams(new FormData(formEl))

  fetch(`${API_URL}/guitars`, {
    method: 'POST',
    body,
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then(() => {
      alert('Guitar saved')
    })
    .catch((err) => {
      console.error(err)
      alert('Error saving guitar')
    })
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }

  return response
}
