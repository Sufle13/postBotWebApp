const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Указываем папку для статики
app.use(express.static("public"));

// Маршрут для проверки
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
