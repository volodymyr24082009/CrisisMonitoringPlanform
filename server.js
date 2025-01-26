const express = require("express")
const path = require("path")
const app = express()
const port = 3000

// Служити статичні файли з директорії 'public'
app.use(express.static("public"))

// Маршрут для головної сторінки
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// API маршрут для отримання даних про кризові ситуації
app.get("/api/crises", (req, res) => {
  // Тут би був код для отримання реальних даних з бази даних
  const mockData = [
    { id: 1, type: "Конфлікт", location: "Східна Європа", severity: "Висока", lat: 50.4501, lon: 30.5234 },
    { id: 2, type: "Природна катастрофа", location: "Південна Азія", severity: "Середня", lat: 28.6139, lon: 77.209 },
    { id: 3, type: "Економічна криза", location: "Південна Америка", severity: "Низька", lat: -15.7801, lon: -47.9292 },
  ]
  res.json(mockData)
})

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`)
})

