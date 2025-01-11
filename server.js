const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, "public")));

// Главная страница
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
