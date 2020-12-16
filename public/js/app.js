const apiStatusEl = document.getElementById("api-status");

const isProd = true;
const API_URL = isProd
  ? "http://dev.embrycode.com/api"
  : "http://localhost:3000";

fetch(`${API_URL}/health-check`)
  .then((res) => {
    const isHealthy = res.status === 200;

    setApiStatus(isHealthy);
  })
  .catch((err) => {
    console.error(err);

    setApiStatus(false);
  });

function setApiStatus(isHealthy) {
  apiStatusEl.innerHTML = isHealthy
    ? '<span class="api-status up">Up</span>'
    : '<span class="api-status down">Down</span>';
}
