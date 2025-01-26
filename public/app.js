// Ініціалізація карти
const map = L.map("map").setView([0, 0], 2)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map)

// Функція для отримання даних про кризи
async function fetchCrisisData() {
  const response = await fetch("/api/crises")
  const data = await response.json()
  return data
}

// Функція для оновлення карти
function updateMap(crises) {
  crises.forEach((crisis) => {
    L.marker([crisis.lat, crisis.lon]).addTo(map).bindPopup(`${crisis.type} - ${crisis.location} (${crisis.severity})`)
  })
}

// Функція для оновлення графіків
function updateCharts(crises) {
  const typeData = {}
  const severityData = { Висока: 0, Середня: 0, Низька: 0 }

  crises.forEach((crisis) => {
    typeData[crisis.type] = (typeData[crisis.type] || 0) + 1
    severityData[crisis.severity]++
  })

  new Chart(document.getElementById("crisisTypeChart"), {
    type: "pie",
    data: {
      labels: Object.keys(typeData),
      datasets: [
        {
          data: Object.values(typeData),
          backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Типи кризових ситуацій",
      },
    },
  })

  new Chart(document.getElementById("severityChart"), {
    type: "bar",
    data: {
      labels: Object.keys(severityData),
      datasets: [
        {
          label: "Рівень серйозності",
          data: Object.values(severityData),
          backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Рівень серйозності кризових ситуацій",
      },
    },
  })
}

// Функція для оновлення стрічки новин
function updateNewsFeed(crises) {
  const newsList = document.getElementById("news-list")
  newsList.innerHTML = ""
  crises.forEach((crisis) => {
    const li = document.createElement("li")
    li.textContent = `${crisis.type} в ${crisis.location} - ${crisis.severity} рівень серйозності`
    newsList.appendChild(li)
  })
}

// Головна функція для оновлення всього інтерфейсу
async function updateDashboard() {
  const crises = await fetchCrisisData()
  updateMap(crises)
  updateCharts(crises)
  updateNewsFeed(crises)
}

// Оновлюємо дашборд при завантаженні сторінки
document.addEventListener("DOMContentLoaded", updateDashboard)

// Оновлюємо дашборд кожні 5 хвилин
setInterval(updateDashboard, 5 * 60 * 1000)

